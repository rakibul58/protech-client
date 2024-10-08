"use client";
import Comment from "@/src/components/UI/Comment";
import CommentForm from "@/src/components/UI/CommentForm";
import CommentSkeleton from "@/src/components/UI/CommentSkeleton";
import { useGetComments } from "@/src/hooks/comment.hook";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Comments({
  params,
}: {
  params: { postId: string };
}) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetComments(params.postId);

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
    <div className="p-4 w-full md:max-w-4xl mx-auto mb-6 mt-5">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      <CommentForm postId={params.postId} />
      <div className="mt-4 space-y-4 w-full">
        {/* Render the fetched posts */}
        {isLoading &&
          [...Array(5)].map((_, index: number) => <CommentSkeleton />)}
        {!isLoading &&
          data?.pages.map((page, pageIndex) =>
            page.result.map((comment: any, commentIndex: number) => (
              // post.author._id !== (user?._id) &&
              <motion.div
                key={`${pageIndex}-${commentIndex}`}
                custom={commentIndex}
                initial="hidden"
                animate="visible"
                variants={postVariants}
                className="w-full"
              >
                <div className="max-w-4xl w-full">
                  <Comment comment={comment} />
                </div>
              </motion.div>
            ))
          )}

        {/* Skeleton loading when fetching more posts */}
        {isFetchingNextPage &&
          [...Array(1)].map((_, index: number) => (
            <CommentSkeleton key={index} />
          ))}

        {/* Observer target for fetching more posts */}
        <div ref={loadMoreRef} className="w-full h-1" />

        {/* If no more data to load */}
        {!hasNextPage && !isLoading && (
          <div className="flex flex-col items-center mt-4">
            {/* Back to Top button */}
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
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
