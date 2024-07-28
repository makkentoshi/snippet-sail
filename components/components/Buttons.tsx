"use client";
import React from "react";
import { Button } from "../ui/button";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { getAuth } from "@clerk/nextjs/server";

const Buttons = () => {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <Button className="max-sm:w-full bg-[#31267a] text-white rounded-[10px] px-6"></Button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
          <Link href="/sign-in">
            <Button className="max-sm:w-full bg-[#31267a] text-white rounded-[10px] px-6">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="max-sm:w-full bg-white px-7 text-[#31267a] rounded-[10px] border">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Buttons;
