"use client";
import RecommendedUser from "@/src/components/UI/RecommendedUser";
import RecommendedUserSkeleton from "@/src/components/UI/RecommendedUserSkeleton";
import { useGetRecommended } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default async function Page() {
  const { data: recommendedUsers, isLoading } = useGetRecommended();

  // console.log(recommendedUsers?.pages[0]?.result?.result);

  // Animation variants for staggered effect
  const postVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from offscreen and invisible
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5, // Stagger the appearance of each post
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Recommended Profiles</h2>
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        {!isLoading
          ? recommendedUsers?.pages[0]?.data?.result?.map(
              (user: any, postIndex: number) => (
                // post.author._id !== (user?._id) &&
                <motion.div
                  key={postIndex}
                  custom={postIndex}
                  initial="hidden"
                  animate="visible"
                  variants={postVariants}
                  className="w-full"
                >
                  <div className="max-w-3xl w-full">
                    <RecommendedUser key={postIndex} user={user} />
                  </div>
                </motion.div>
              )
            )
          : [...new Array(5)].map((_, postIndex: number) => (
              <div className="max-w-3xl w-full">
                <RecommendedUserSkeleton key={postIndex} />
              </div>
            ))}

        <Link href={'/user/recommended-profiles'}>
          <Button variant="light" color="primary" className="mt-5">
            See More
          </Button>
        </Link>
      </div>
    </div>
  );
}
