"use client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

const ProfileUser = () => {
  const { user } = useUser();
  const imageUrl = user?.imageUrl || "";

  const loading = (
    <div className="w-9 h-9 rounded-full mb-[5px] bg-slate-200 animate-spin flex items-center justify-center">
      <Loader></Loader>
    </div>
  );

  return (
    <div className="flex gap-3 items-center">
      {!user ? (loading) : (
      <Image
        src={imageUrl}
        alt={`${user?.firstName} ${user?.lastName}}`}
        className="w-9 h-9 rounded-full mb-[5px]"
        width={36}
        height={36}
      />
      )}
      <div className="flex flex-col text-sm">
        <span className="font-semibold">
          {user?.lastName} {user?.firstName}
        </span>
        <span className="text-slate-500 text-[11px]">
          {user?.emailAddresses[0].emailAddress}
        </span>
      </div>
    </div>
  );
};

export default ProfileUser;
