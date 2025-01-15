import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex justify-center items-center min-h-[100svh]">
      <SignedOut>
        <SignInButton>
          <button className="signin-button">Click to Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <span className="text-sm ">
          You are already signed in.{" "}
          <Link href={"/compare"} className="underline text-blue-600">
            Go to compare page
          </Link>
        </span>
      </SignedIn>
    </div>
  );
}
