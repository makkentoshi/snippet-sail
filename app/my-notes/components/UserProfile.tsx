"use client";

import { UserButton, useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const { user } = useUser();
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
