import { auth } from "@/auth";
import { Wallet } from "./wallet";

export async function User() {
  const session = await auth()
  if (!session) {
    return null
  }

  return (
    <div className="p-4">
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Wallet: {(session?.user as any).wallet}</p>
      <Wallet address={(session.user as any).wallet as string} />
    </div>
  )
}