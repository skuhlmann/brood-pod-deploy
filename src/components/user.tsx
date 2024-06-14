import { auth } from "@/auth";

export async function User() {
  const session = await auth()
  if (!session) {
    return null
  }
  console.log({session})
  return (
    <div className="p-4">
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Wallet: {(session?.user as any).wallet}</p>
    </div>
  )
}