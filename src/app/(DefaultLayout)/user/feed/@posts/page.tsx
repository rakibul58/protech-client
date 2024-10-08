"use client";
import PostCard from "@/src/components/UI/PostCard";
import PostCardSkeleton from "@/src/components/UI/PostCardSkeleton";
import { useGetPosts } from "@/src/hooks/post.hook";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import TopSection from "@/src/components/modules/Feed/TopSection";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/context/user.provider";
export default function FeedPage() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetPosts(searchTerm, category, sort);

  // Ref for detecting when the user reaches the bottom of the page
  const loadMoreRef = useRef(null);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["GET_POSTS"] });
    refetch();
  }, [category, sort, searchTerm]);

  // Intersection Observer to load more posts when the bottom of the page is reached
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // Fetch next page when the user reaches the bottom
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

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
    <div>
      {" "}
      <div className="md:hidden block max-w-6xl mx-auto w-full fixed bottom-0 left-0 right-0 z-50 p-5 bg-white dark:bg-black bg-opacity-70 backdrop-blur-md col-span-12 lg:col-span-12">
        <TopSection
          onSearch={setSearchTerm}
          setCategory={setCategory}
          setSort={setSort}
        />
      </div>
      <div className="hidden md:block max-w-6xl mx-auto w-full fixed top-14 left-0 right-0 z-50 p-5 bg-opacity-70 backdrop-blur-md col-span-12 lg:col-span-12">
        <TopSection
          onSearch={setSearchTerm}
          setCategory={setCategory}
          setSort={setSort}
        />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center w-full mb-40 mt-8 md:mt-28 md:mb-10">
        {/* Show skeleton loader while fetching the first batch of posts */}
        {isLoading &&
          [...Array(5)].map((_, index: number) => (
            <PostCardSkeleton key={index} />
          ))}

        {/* Render the fetched posts */}
        {!isLoading &&
          data?.pages.map((page, pageIndex) =>
            page.result.map((post: any, postIndex: number) => (
              // post.author._id !== (user?._id) &&
              <motion.div
                key={`${pageIndex}-${postIndex}`}
                custom={postIndex}
                initial="hidden"
                animate="visible"
                variants={postVariants}
                className="w-full"
              >
                <div className="max-w-3xl w-full">
                  <PostCard post={post} />
                </div>
              </motion.div>
            ))
          )}

        {/* Skeleton loading when fetching more posts */}
        {isFetchingNextPage &&
          [...Array(5)].map((_, index: number) => (
            <PostCardSkeleton key={index} />
          ))}

        {/* Observer target for fetching more posts */}
        <div ref={loadMoreRef} className="w-full h-1" />

        {/* If no more data to load */}
        {!hasNextPage && !isLoading && (
          <div className="flex flex-col items-center mt-4">
            {/* Back to Top button */}
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" }),
                  queryClient.removeQueries({ queryKey: ["GET_POSTS"] });
                refetch();
              }}
              variant="light"
              color="primary"
            >
              Back to Top
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
