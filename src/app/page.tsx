import { OAuthButton } from "@/components/auth-button";
import { User } from "@/components/user";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <User />
      <OAuthButton />
    </main>
  );
}
