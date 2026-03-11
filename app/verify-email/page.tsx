import Link from "next/link";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: { email?: string };
}) {
  const email = typeof searchParams?.email === "string" ? searchParams.email : "";

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-130 rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-10 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">Verify your email</h1>
        <p className="mt-3 text-sm text-neutral-600">
          We&apos;ve sent a verification link to your email address.
        </p>
        {email && (
          <p className="mt-1 text-sm text-neutral-800">
            <span className="font-medium">Email:</span> {email}
          </p>
        )}
        <p className="mt-4 text-sm text-neutral-600">
          Please check your inbox (and spam folder), then click the link to
          activate your account before logging in.
        </p>
        <div className="mt-6">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}