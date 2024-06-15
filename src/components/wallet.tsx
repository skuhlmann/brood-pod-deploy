"use client";

import { useAccount, useConnect, useDisconnect, useSendTransaction } from "wagmi";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { parseEther } from "viem";

export function Wallet({ address }: { address: string }) {
  const { address: connectedAddress, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { sendTransaction, isPending, isSuccess, data: hash, isError } = useSendTransaction()

  useEffect(() => {
    if (address && !connectedAddress && !isConnected) {
      connect({ connector: connectors[0] })
    }
    if (isSuccess) {
      console.log("Transaction sent with hash:", hash)
    }
    if (isError) {
      console.error("Error sending transaction:", hash)
    }
  }, [isSuccess, hash, isError, address, connectedAddress, isConnected, connect, connectors])

  function handleSendTransaction() {
    sendTransaction({
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      value: parseEther("0.01"),
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
      </div>
    </div>
  );
}