import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
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
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-sm ">
            You are already signed in.{" "}
            <Link href={"/compare"} className="underline text-blue-600">
              Go to compare page
            </Link>
          </span>{" "}
          <span className="text-sm ">
            or{" "}
            <SignOutButton>
              <button className="underline text-blue-600">Sign out</button>
            </SignOutButton>
          </span>
        </div>
      </SignedIn>
    </div>
  );
}
