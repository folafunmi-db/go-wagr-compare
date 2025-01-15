import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[100svh]">
      <h1>You are offline!</h1>
      <Link href="/" prefetch={false}>
        back home
      </Link>
    </div>
  );
}
