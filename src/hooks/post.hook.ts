import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../services/PostService";

// Hook for infinite scrolling with React Query
export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ["GET_POSTS"],
    queryFn: async ({ pageParam = 1 }) => await getPosts(pageParam), // Pass `pageParam` for pagination
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine if there's a next page
    initialPageParam: 1, // Set the initial page to 1
  });
};
