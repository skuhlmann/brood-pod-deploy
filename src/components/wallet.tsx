"use client";

import { useAccount, useChainId, useChains, useConnect, useDisconnect, useSendTransaction, useSignMessage, useSignTypedData, useSwitchChain, useWriteContract } from "wagmi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { parseAbi, parseEther } from "viem";
import { useSendCalls, useWriteContracts } from "wagmi/experimental";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Wallet({ address }: { address: string }) {
  const { address: connectedAddress, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [connected, setConnected] = useState(false)

  const { switchChain, chains } = useSwitchChain()
  const chainId = useChainId()

  const {
    sendTransaction, 
    isPending, 
    isSuccess, 
    data: hash, 
    isError,
    error
  } = useSendTransaction()
  const {
    sendCalls: sendBatchTransaction,
    isPending: isBatchPending,
    isSuccess: isBatchSuccess,
    data: batchData,
    isError: isBatchError,
    error: batchError
  } = useSendCalls()
  const {
    signMessage,
    isPending: isSignaturePending,
    isSuccess: isSignatureSuccess,
    data: signatureData,
    isError: isSignatureError,
    error: signatureError
  } = useSignMessage()
  const {
    signTypedData,
    isPending: isSignTypedDataPending,
    isSuccess: isSignTypedDataSuccess,
    data: signTypedDataHash,
    isError: isSignTypedDataError,
    error: signTypedDataError
  } = useSignTypedData()

  // handle auto-connect on address change
  useEffect(() => {
    if (address && !connectedAddress && !isConnected && !connected) {
      connect({ connector: connectors[0] })
      setConnected(true)
    }
  }, [address, connectedAddress, isConnected, connect, connectors, connected])

  // handle transaction status
  useEffect(() => {
    if (isSuccess) {
      console.log("Transaction sent with hash:", hash)
      toast("Transaction sent!")
    }
    if (isError) {
      console.error("Error sending transaction:", error)
      toast("Error sending transaction.")
    }
  }, [isSuccess, hash, isError, error])

  // handle batch transaction status
  useEffect(() => {
    if (isBatchSuccess) {
      console.log("Batch transaction sent with data:", batchData)
      toast("Batch transaction sent!")
    }
    if (isBatchError) {
      console.error("Error sending batch transaction:", batchError)
      toast("Error sending batch transaction.")
    }
  }, [isBatchSuccess, batchData, isBatchError, batchError])

  // handle sign message status
  useEffect(() => {
    if (isSignatureSuccess) {
      console.log("signature:", signatureData)
      toast("Signed message!")
    }
    if (isError) {
      console.error("Error signing message:", signatureError)
      toast("Error signing message.")
    }
  }, [isSignatureSuccess, signatureData, isSignatureError, signatureError])

  // handle sign message status
  useEffect(() => {
    if (isSignTypedDataSuccess) {
      console.log("signature:", signTypedDataHash)
      toast("Signed message!")
    }
    if (isSignTypedDataError) {
      console.error("Error signing message:", signTypedDataError)
      toast("Error signing message.")
    }
  }, [isSignTypedDataSuccess, signTypedDataHash, isSignTypedDataError, signTypedDataError])

  function handleSendTransaction() {
    sendTransaction({
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      // value: parseEther("0.01"),
      data: "0x12345678"
    })
  }

  function handleSendBatchTransaction() {
    sendBatchTransaction({
      calls: [
        {
          to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
          // value: parseEther("0.01"),
          data: "0x12345678"
        },
        {
          to: '0xEC17Ec950Ec557b0398a0E735843d59e77744D4D', // johndoe.eth
          // value: parseEther("0.01"),
          data: "0x12345678"
        },
      ],
    })
  }

  function handleSignMessage() {
    signMessage({
      message: "Hello World!"
    })
  }

  function handleSignTypedData() {
    signTypedData({
      types: {
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      primaryType: 'Mail',
      message: {
        from: {
          name: 'Cow',
          wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
          name: 'Bob',
          wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
      },
    })
  }
  
  return (
    <div className="mt-2">
      <h1>Wallet connected: {isConnected ? "Yes" : "No"}</h1>
      <h1>Chain: {chainId}</h1>
      <div className="flex flex-row w-full items-center gap-2 my-2">
        <Button variant="outline" onClick={() => {
          if (isConnected) return disconnect()
          return connect({ connector: connectors[0] })
        }}>
          {!isConnected ? "Connect" : "Disconnect"}
        </Button>
        <Button variant="outline" onClick={() => {
          console.log("Connected Address:", connectedAddress)
        }}>
          Check Connected Address
        </Button>
        <Select
          value={chainId.toString()}
          onValueChange={(value) => {
            console.log(value)
            switchChain({ chainId: Number(value) })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Chain" />
          </SelectTrigger>
          <SelectContent>
            {chains.map((chain) => (
              <SelectItem key={chain.id} value={chain.id.toString()}>
                {chain.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row w-full items-center gap-2 my-2">
        <Button onClick={handleSendTransaction} disabled={!isConnected||isPending}>
          {isPending ? "Confirm in wallet..." : "Send Transaction"}
        </Button>
        <Button onClick={handleSendBatchTransaction} disabled={!isConnected||isBatchPending}>
          {isBatchPending ? "Confirm in wallet..." : "Send Batch Transaction"}
        </Button>
        <Button onClick={handleSignMessage} disabled={!isConnected||isSignaturePending}>
          {isSignaturePending ? "Confirm in wallet..." : "Sign Message"}
        </Button>
        <Button onClick={handleSignTypedData} disabled={!isConnected||isSignTypedDataPending}>
          {isSignTypedDataPending ? "Confirm in wallet..." : "Sign Typed Data"}
        </Button>
      </div>
    </div>
  );
}