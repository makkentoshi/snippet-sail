"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton"; 

const UserProfile = () => {
  const { user } = useUser();
  
  if (!user) {
    return (
      <div className="flex gap-3 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col text-sm">
          <Skeleton className="w-24 h-4 mb-1" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>
    );
  }

  const imageUrl = user?.imageUrl;
  return (
    <div className="flex gap-3 items-center">
      <UserButton></UserButton>
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

export default UserProfile;