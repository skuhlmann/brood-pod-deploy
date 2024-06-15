import type {
  Preference,
  ProviderInterface,
} from '@coinbase/wallet-sdk'
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk'
import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import {
  type Evaluate,
  type Mutable,
  type Omit,
} from '@wagmi/core/internal'
import {
  type AddEthereumChainParameter,
  type Hex,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'
import { signOut } from 'next-auth/react'
import { AliasWalletProvider } from './provider'

export const DEFAULT_WALLET_URL = 'http://localhost:3000/wallet'
// export let ALIAS_STEALTH_ADDRESS: string | undefined

// export function updateAliasAddress(address: string) {
//   ALIAS_STEALTH_ADDRESS = address
// }

export type SmartWalletParameters<version extends '4'> =
  Evaluate<
      {
        headlessMode?: false | undefined
        /** Coinbase Wallet SDK version */
        version?: version | undefined
      } & Version4Parameters
    >

alias.type = 'alias' as const
export function alias<version extends '4'>(
  parameters: SmartWalletParameters<version> = {} as any,
): ReturnType<typeof version4> {
  return version4(parameters as Version4Parameters) as any
}

type Version4Parameters = Mutable<
  Omit<
    ConstructorParameters<typeof CoinbaseWalletSDK>[0],
    'appChainIds' // set via wagmi config
  > & {
    /**
     * Preference for the type of wallet to display.
     * @default 'all'
     */
    preference?: Preference['options'] | undefined,
    keysUrl?: string | undefined,
  }
>

function version4(parameters: Version4Parameters) {
  type Provider = ProviderInterface & {
    // for backwards compatibility
    close?(): void
  }

  // let sdk: CoinbaseWalletSDK | undefined
  let walletProvider: Provider | undefined
  // let walletChainId: number | undefined = localhost.id
  // let address: string | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'alias',
    name: 'Alias',
    supportsSimulation: true,
    type: alias.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x))
        // const session = await getSession()
        // if (!session||!session.user) {
        //   await signIn('alias')
        // }
        // address = (session?.user as any).wallet as string
        // const accounts = ([address] as string[]).map((x) => getAddress(x))

        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', chainChanged)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', disconnect)
        }

        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
          // currentChainId = chainId
          // walletChainId = chainId
        }

        return { accounts, chainId: currentChainId }
      } catch (error) {
        console.error(error)
        if (
          /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(
            (error as Error).message,
          )
        )
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()

      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }

      // address = undefined
      await provider.disconnect()
      provider.close?.()
      await signOut()
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return (
        await provider.request<string[]>({
          method: 'eth_accounts',
        })
      ).map((x) => getAddress(x))
      // if (!address) {
      //   const session = await getSession()
      //   address = (session?.user as any).wallet as string
      // }
      // const accounts = ([address] as string[]).map((x) => getAddress(x))
      // return accounts
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request<Hex>({
        method: 'eth_chainId',
      })
      // const chainId = walletChainId
      return Number(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        // const CoinbaseSDK = await loadDefault<typeof CoinbaseWalletSDK>(
        //   import('@coinbase/wallet-sdk'),
        // )

        // sdk = new CoinbaseWalletSDK({
        //   ...parameters,
        //   appChainIds: config.chains.map((x) => x.id),
        // })

        // walletProvider = sdk.makeWeb3Provider({
        //   ...parameters,
        //   options: parameters.preference ?? 'all',
        //   keysUrl: parameters.keysUrl ?? DEFAULT_WALLET_URL,
        // })

        walletProvider = new AliasWalletProvider({
          metadata: {
            appName: parameters.appName||"Dapp",
            appLogoUrl: parameters.appLogoUrl||null,
            appChainIds: config.chains.map((x) => x.id),
          },
          preference: {
            options: 'smartWalletOnly',
            keysUrl: parameters.keysUrl,
          },
        })
      }

      return walletProvider
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chain.id) }],
        })
        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else
              blockExplorerUrls = chain.blockExplorers?.default.url
                ? [chain.blockExplorers?.default.url]
                : []

            let rpcUrls: readonly string[]
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls
            else rpcUrls = [chain.rpcUrls.default?.http[0] ?? '']

            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency:
                addEthereumChainParameter?.nativeCurrency ??
                chain.nativeCurrency,
              rpcUrls,
            } satisfies AddEthereumChainParameter

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addEthereumChain],
            })

            return chain
          } catch (error) {
            throw new UserRejectedRequestError(error as Error)
          }
        }

        throw new SwitchChainError(error as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }
    },
  }))
}