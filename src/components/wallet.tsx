"use client";

import { useAccount, useConnect, useDisconnect, useSendTransaction } from "wagmi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useSendCalls } from "wagmi/experimental";
import { toast } from "sonner";

export function Wallet({ address }: { address: string }) {
  const { address: connectedAddress, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [connected, setConnected] = useState(false)

  const { sendTransaction, isPending, isSuccess, data: hash, isError } = useSendTransaction()
  const {
    sendCalls: sendBatchTransaction,
    isPending: isBatchPending,
    isSuccess: isBatchSuccess,
    data: batchData,
    isError: isBatchError
  } = useSendCalls()

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

  function handleSendTransaction() {
    sendTransaction({
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      value: parseEther("0.01"),
    })
  }

  function handleSendBatchTransaction() {
    sendBatchTransaction({
      calls: [
        {
          to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
          value: parseEther("0.01"),
        },
        {
          to: '0xEC17Ec950Ec557b0398a0E735843d59e77744D4D', // johndoe.eth
          value: parseEther("0.01"),
        },
      ],
    })
  }
  
  return (
    <div className="mt-2">
      <h1>Wallet connected: {isConnected ? "Yes" : "No"}</h1>
      <div className="flex flex-row w-full items-center gap-2 my-2">
        <Button onClick={() => {
          if (isConnected) return disconnect()
          return connect({ connector: connectors[0] })
        }}>
          {!isConnected ? "Connect" : "Disconnect"}
        </Button>
        <Button onClick={handleSendTransaction} disabled={!isConnected||isPending}>
          {isPending ? "Confirm in wallet..." : "Send Transaction"}
        </Button>
        <Button onClick={handleSendBatchTransaction} disabled={!isConnected||isBatchPending}>
          {isBatchPending ? "Confirm in wallet..." : "Send Batch Transaction"}
        </Button>
      </div>
    </div>
  );
}