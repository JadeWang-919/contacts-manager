"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      redirect("/contacts");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <BarLoader color="##5cdfa3" loading={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row flex-grow lg:justify-between my-12 gap-16">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Contact Manager</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Keep track of your contacts, notes, and tags with a minimal and fast
          experience.
        </p>

        <div className="flex gap-4">
          <SignUpButton mode="modal">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 hover:shadow-md transition duration-300 ease-in-out">
              Get Started
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition duration-300 ease-in-out">
              I already have an account
            </button>
          </SignInButton>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/welcome.png"
          alt="Welcome illustration"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
