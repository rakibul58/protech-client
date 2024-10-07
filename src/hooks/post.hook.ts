import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createPosts,
  downVotePost,
  getPosts,
  upVotePost,
} from "../services/PostService";
import { toast } from "sonner";

// Hook for infinite scrolling with React Query
export const useGetPosts = (
  searchTerm = "",
  category = "",
  sort = "-createdAt"
) => {
  return useInfiniteQuery({
    queryKey: ["GET_POSTS", searchTerm, category, sort],
    queryFn: async ({ pageParam = 1 }) =>
      await getPosts(pageParam, 5, searchTerm, category, sort),
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

export const useUpVotePost = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async ({ postId }) => await upVotePost({ postId }),
    onSuccess: () => {
      // toast.success("Post upVoted successful.");
    },
    onError: (error) => {
      // console.log(error);
      // toast.error("Failed to Create Post!");
    },
  });
};

export const useDownVotePost = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async ({ postId }) => await downVotePost({ postId }),
    onSuccess: () => {
      // toast.success("Post upVoted successful.");
    },
    onError: (error) => {
      // console.log(error);
      // toast.error("Failed to Create Post!");
    },
  });
};
