import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <SignedOut>
        <SignInButton />
      </SignedOut>
    );
  }

  redirect("/compare");
}

