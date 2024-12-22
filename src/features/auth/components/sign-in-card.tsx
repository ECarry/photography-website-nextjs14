"use client";

// External dependencies
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
// Internal dependencies - UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, TriangleAlert } from "lucide-react";

export const SignInCard = () => {
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");
  const callbackUrl = params.get("callbackUrl") || "/";

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingLogin(true);

    signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
  };

  return (
    <div className="w-full flex flex-col justify-between gap-10 p-10 lg:p-16 bg-muted rounded-xl flex-1">
      <div className="px-0 pt-0">
        <h1 className="text-[32px] lg:text-[40px]">Login to continue</h1>
      </div>

      <form onSubmit={onCredentialSignIn} className="space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            disabled={loading || loadingLogin}
            required
            className="bg-background text-text-default placeholder:text-text-muted py-[14px] px-[16px]"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            disabled={loading || loadingLogin}
            required
            className="bg-background text-text-default placeholder:text-text-muted py-[14px] px-[16px]"
          />
        </div>
        <Button
          className="w-full bg-background hover:bg-muted text-text-default placeholder:text-text-muted"
          type="submit"
          size="lg"
          disabled={loading}
        >
          {loadingLogin ? (
            <Loader2 className="mr-2 size-5 top-2.5 left-2.5 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>Invalid email or password</p>
          </div>
        )}
      </form>
    </div>
  );
};
