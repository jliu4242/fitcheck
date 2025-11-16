"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-4 pb-5 bg-gradient-to-b from-background via-background to-muted">
      <Card className="w-full max-w-md bg-background/70 backdrop-blur-xl border-border/60 shadow-xl rounded-3xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Log in to continue using your PWA."
              : "Sign up to start your journey."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Toggle */}
          <div className="flex w-full rounded-full bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full text-sm transition-all ${
                isLogin
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-full text-sm transition-all ${
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Forms */}
          <div className="pt-2">
            {isLogin ? (
              <LoginForm switchToSignup={() => setMode("signup")} />
            ) : (
              <SignupForm switchToLogin={() => setMode("login")} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
