import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPosts, getPosts } from "../services/PostService";
import { toast } from "sonner";

// Hook for infinite scrolling with React Query
export const useGetPosts = (searchTerm = "") => {
  return useInfiniteQuery({
    queryKey: ["GET_POSTS", searchTerm],
    queryFn: async ({ pageParam = 1 }) =>
      await getPosts(pageParam, 5, searchTerm),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine if there's a next page
    initialPageParam: 1, // Set the initial page to 1
  });
};

export const useCreatePosts = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, { content: string; categories: string[] }>({
    mutationKey: ["CREATE_POSTS"],
    mutationFn: async (payload) => await createPosts(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
      toast.success("Post created successful.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to Create Post!");
    },
  });
};
