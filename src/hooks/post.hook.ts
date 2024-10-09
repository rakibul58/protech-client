import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createPosts,
  downVotePost,
  getMyPosts,
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

  return useMutation<
    any,
    Error,
    { content: string; categories: string[]; isPremium: boolean }
  >({
    mutationKey: ["CREATE_POSTS"],
    mutationFn: async (payload) => await createPosts(payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
      // queryClient.refetchQueries({ queryKey: ["GET_POSTS"], exact: true });
      toast.success("Post created successfully.");
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

export const useGetMyPosts = (
  page = 1,
  searchTerm = "",
  category = "",
  sort = "-createdAt",
  limit = 5
) => {
  return useQuery({
    queryKey: ["GET_MY_POSTS", page, searchTerm, category, sort, limit],
    queryFn: async () =>
      await getMyPosts(page, limit, searchTerm, category, sort),
  });
};
