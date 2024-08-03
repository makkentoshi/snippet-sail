"use client";

import { useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const { user } = useUser();
  const imageUrl = user?.imageUrl;
  return (
    <div className="flex gap-3 items-center">
      <img src={imageUrl} alt={`${user?.firstName} ${user?.lastName}`}></img>
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
