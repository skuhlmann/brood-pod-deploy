import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function OAuthButton() {
  async function login() {
    "use server"
    await signIn("alias")
  }

  async function logout() {
    "use server"
    await signOut()
  }

  const session = await auth()
  
  return (
    <form
      className="flex flex-col items-center justify-center p-2"
      action={!session ? login : logout}
    >
      <Button type="submit">{!session ? "Sign In with Alias" : "Sign Out"}</Button>
    </form>
  )
}