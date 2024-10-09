"use client";

import { useState } from "react";
import AnalyticsSkeleton from "./AnalyticsSkeleton";
import { Pagination } from "@nextui-org/pagination";
import { useGetFollowers, useGetFollowing } from "@/src/hooks/auth.hook";
import FollowersCard from "../../UI/FollowersCard";
import { IUser } from "@/src/types";
import FollowingCard from "../../UI/FollowingCard";

const Following: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  const { data: myFollowers, isPending } = useGetFollowing(currentPage, limit);

  if (isPending) return <AnalyticsSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">Followed Profiles</h2>

        <div>
          {myFollowers?.result?.map((user: Partial<IUser>, index: number) => (
            <FollowingCard key={index} user={user} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          showControls
          total={myFollowers?.totalPage || 1}
          boundaries={1}
          page={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
          className="w-fit self-center"
        />
      </div>
    </div>
  );
};

export default Following;
