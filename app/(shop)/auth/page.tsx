"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSupabaseClient } from "@/lib/supabase/client";
import { authenticate } from "./action";

type AuthTab = "login" | "signup";

type AuthState = {
  errors?: string;
};

export default function LoginForm() {
  const [tab, setTab] = React.useState<AuthTab>("login");
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, authAction] = useActionState<AuthState | undefined, FormData>(
    authenticate,
    undefined
  );

  async function signInWithGoogle() {
    const supabase = getSupabaseClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }


  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-2">
      <div className="w-full max-w-130">
        <div className="flex items-end justify-center gap-16 mb-6">
          <TabButton active={tab === "login"} onClick={() => setTab("login")}>
            Login
          </TabButton>
          <TabButton active={tab === "signup"} onClick={() => setTab("signup")}>
            Sign up
          </TabButton>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm px-10 py-10">
          <div className="flex items-center justify-center gap-8 mb-8">
            <IconCircleButton
              ariaLabel="Continue with Facebook"
              onClick={() => {
                // add Supabase Facebook OAuth later
              }}
            >
              <FacebookLogo />
            </IconCircleButton>

            <IconCircleButton
              ariaLabel="Continue with Google"
              onClick={signInWithGoogle}
            >
              <GoogleLogo />
            </IconCircleButton>
          </div>

          <div className="text-sm text-neutral-500 mb-4">Or continue with:</div>

          <form className="space-y-5" action={authAction}>
            <input type="hidden" name="mode" value={tab} />

            {tab === "signup" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First Name *"
                  required
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-[15px] outline-none focus:border-neutral-400"
                />
                <input
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last Name *"
                  required
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-[15px] outline-none focus:border-neutral-400"
                />
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              className="w-full rounded-md border border-neutral-200 px-4 py-3 text-[15px] outline-none focus:border-neutral-400"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                className="w-full rounded-md border border-neutral-200 px-4 py-3 pr-12 text-[15px] outline-none focus:border-neutral-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {state?.errors && (
              <p className="text-sm text-red-500">
                Failed to {tab === "login" ? "login" : "sign up"}. {state.errors}
              </p>
            )}

            <div className="flex items-center justify-end">
              <a href="/forgot-password" className="text-sm text-sky-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            <label className="flex items-center gap-3 text-[15px] text-neutral-700 select-none">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-0"
              />
              Keep me signed in
            </label>

            <SubmitButton tab={tab} />

            <p className="pt-2 text-center text-xs text-neutral-500">
              By creating your account or signing in, you agree to our{" "}
              <a href="#" className="text-sky-700 hover:underline">
                Terms and Conditions
              </a>{" "}
              &amp;{" "}
              <a href="#" className="text-sky-700 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ tab }: { tab: AuthTab }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full rounded-md bg-neutral-900 px-4 py-3 text-[15px] font-medium text-white disabled:opacity-60"
    >
      {pending ? "Please wait..." : tab === "login" ? "Login" : "Sign up"}
    </button>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative pb-3 text-lg font-semibold",
        active ? "text-black" : "text-neutral-400",
      ].join(" ")}
    >
      {children}
      {active && (
        <span className="absolute left-1/2 -bottom-0.5 h-0.5 w-28 -translate-x-1/2 bg-neutral-900" />
      )}
    </button>
  );
}

function IconCircleButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="grid place-items-center rounded-full p-2 hover:bg-neutral-100"
    >
      {children}
    </button>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.035 1.792-4.714 4.533-4.714 1.312 0 2.686.236 2.686.236v2.98h-1.513c-1.49 0-1.953.93-1.953 1.885v2.272h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.636 32.659 29.218 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.962 3.038l5.657-5.657C34.047 6.053 29.272 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.01 12 24 12c3.059 0 5.842 1.154 7.962 3.038l5.657-5.657C34.047 6.053 29.272 4 24 4c-7.682 0-14.377 4.327-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.199-5.244C29.152 35.091 26.715 36 24 36c-5.197 0-9.602-3.317-11.271-7.946l-6.52 5.025C9.5 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.8 2.26-2.258 4.171-4.093 5.559l.003-.002 6.199 5.244C36.973 39.169 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
      />
    </svg>
  );
}