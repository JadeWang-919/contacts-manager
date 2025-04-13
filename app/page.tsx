"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();

  // ✨ Wait until Clerk finishes loading
  if (!isLoaded) return null;

  // ✅ Redirect immediately once loaded and signed in
  if (isSignedIn) {
    redirect("/contacts");
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Contact Manager</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Keep track of your contacts, notes, and tags with a minimal and fast
        experience.
      </p>

      <div className="flex gap-4">
        <SignUpButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Get Started
          </button>
        </SignUpButton>

        <SignInButton mode="modal">
          <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
            I already have an account
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
