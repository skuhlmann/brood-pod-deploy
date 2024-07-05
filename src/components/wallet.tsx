"use client";

import { useAccount, useChainId, useChains, useConnect, useDisconnect, useSendTransaction, useSwitchChain, useWriteContract } from "wagmi";
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

  const { sendTransaction, isPending, isSuccess, data: hash, isError } = useSendTransaction()
  const {
    sendCalls: sendBatchTransaction,
    isPending: isBatchPending,
    isSuccess: isBatchSuccess,
    data: batchData,
    isError: isBatchError
  } = useSendCalls()

  const {
    writeContract,
    isPending: isWCPending,
    isSuccess: isWCSuccess,
    data: wcData,
    isError: isWCError
  } = useWriteContract()
  const {
    writeContracts,
    isPending: isBatchWCPending,
    isSuccess: isBatchWCSuccess,
    data: batchWCData,
    isError: isBatchWCError
  } = useWriteContracts()

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
      console.error("Error sending transaction:", hash)
      toast("Error sending transaction.")
    }
  }, [isSuccess, hash, isError])

  // handle batch transaction status
  useEffect(() => {
    if (isBatchSuccess) {
      console.log("Batch transaction sent with data:", batchData)
      toast("Batch transaction sent!")
    }
    if (isBatchError) {
      console.error("Error sending batch transaction:", batchData)
      toast("Error sending batch transaction.")
    }
  }, [isBatchSuccess, batchData, isBatchError])

  // handle write contract status
  useEffect(() => {
    if (isWCSuccess) {
      console.log("Transaction sent with hash:", wcData)
      toast("Transaction sent!")
    }
    if (isError) {
      console.error("Error sending transaction:", wcData)
      toast("Error sending transaction.")
    }
  }, [isWCSuccess, wcData, isWCError])

  // handle batch transaction status
  useEffect(() => {
    if (isBatchWCSuccess) {
      console.log("Batch transaction sent with data:", batchWCData)
      toast("Batch transaction sent!")
    }
    if (isBatchWCError) {
      console.error("Error sending batch transaction:", batchWCData)
      toast("Error sending batch transaction.")
    }
  }, [isBatchWCSuccess, batchWCData, isBatchWCError])

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

  function handleWriteContract() {
    writeContract({
      address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
      abi: parseAbi([
        "function mint(address to, uint256 amount) public",
      ]),
      functionName: "mint",
      args: [address as `0x${string}`, parseEther("100")],
    })
  }

  function handleWriteContracts() {
    const abi = parseAbi([
      "function mint(address to, uint256 amount) public",
    ])
    writeContracts({
      contracts: [
        {
          address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
          abi,
          functionName: "mint",
          args: [address as `0x${string}`, parseEther("100")],
        },
        {
          address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
          abi,
          functionName: "mint",
          args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', parseEther("100")],
        },
        {
          address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
          abi,
          functionName: "mint",
          args: ['0xEC17Ec950Ec557b0398a0E735843d59e77744D4D', parseEther("100")],
        },
      ]
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
          defaultValue={chainId.toString()}
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
        <Button onClick={handleWriteContract} disabled={!isConnected||isWCPending}>
          {isWCPending ? "Confirm in wallet..." : "Mint Token"}
        </Button>
        <Button onClick={handleWriteContracts} disabled={!isConnected||isBatchWCPending}>
          {isBatchWCPending ? "Confirm in wallet..." : "Batch Mint Token"}
        </Button>
      </div>
    </div>
  );
}