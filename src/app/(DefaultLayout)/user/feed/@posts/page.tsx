"use client";
import PostCard from "@/src/components/UI/PostCard";
import PostCardSkeleton from "@/src/components/UI/PostCardSkeleton";
import { useGetPosts } from "@/src/hooks/post.hook";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
export default function FeedPage() {
  const {
    data, // Data returned by the hook
    isLoading, // Initial loading state
    isFetchingNextPage, // Loading state when fetching additional pages
    fetchNextPage, // Function to fetch the next page
    hasNextPage, // Indicates if there are more pages to fetch
  } = useGetPosts();

  // Ref for detecting when the user reaches the bottom of the page
  const loadMoreRef = useRef(null);

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
        duration: 0.8,
      },
    }),
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full mb-40 md:mb-10">
      {/* Show skeleton loader while fetching the first batch of posts */}
      {isLoading &&
        [...Array(3)].map((_, index: number) => (
          <PostCardSkeleton key={index} />
        ))}

      {/* Render the fetched posts */}
      {!isLoading &&
        data?.pages.map((page, pageIndex) =>
          page.result.map((post: any, postIndex: number) => (
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
        [...Array(3)].map((_, index: number) => (
          <PostCardSkeleton key={index} />
        ))}

      {/* Observer target for fetching more posts */}
      <div ref={loadMoreRef} className="w-full h-1" />

      {/* If no more data to load */}
      {!hasNextPage && !isLoading && (
        <div className="flex flex-col items-center mt-8">

          {/* Back to Top button */}
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            variant="light"
            color="primary"
          >
            Back to Top
          </Button>
        </div>
      )}
    </div>
  );
}
