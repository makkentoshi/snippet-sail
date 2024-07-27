"use client";
import React from "react";
import { Button } from "../ui/button";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { getAuth } from "@clerk/nextjs/server";

const Buttons = () => {
  
  const { userId } = useAuth();
  return (
    <div className="flex gap-4 items-center max-sm:flex-col max-sm:w-[60%] max-sm:mt-8">
      <div className="max-sm:w-full">
        {userId ? (
          <Link href="/my-notes">
            <Button className="max-sm:w-full bg-[#31267a] text-white rounded-[10px] px-6"></Button>
          </Link>
        ) : (
          <>
            <Button className="max-sm:w-full bg-[#31267a] text-white rounded-[10px] px-6">
              Sign Out
            </Button>
            <Button className="max-sm:w-full bg-[#31267a] px-6 text-white rounded-">
              Sign In
            </Button>
          </>
        )}
      </div>
    </div>
    
  );

};

export default Buttons;
