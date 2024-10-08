import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../services/CommentService";

// Hook for infinite scrolling with React Query
export const useGetComments = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["GET_COMMENTS", id],
    queryFn: async ({ pageParam = 1 }) => await getComments(id, pageParam, 5),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine if there's a next page
    initialPageParam: 1, // Set the initial page to 1
  });
};
