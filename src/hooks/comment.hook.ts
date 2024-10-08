import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createComment, getComments } from "../services/CommentService";
import { toast } from "sonner";

// Hook for infinite scrolling with React Query
export const useGetComments = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["GET_COMMENTS", id],
    queryFn: async ({ pageParam = 1 }) => await getComments(id, pageParam, 5),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine if there's a next page
    initialPageParam: 1, // Set the initial page to 1
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    { content: string; parent?: string | null; post: string }
  >({
    mutationKey: ["GET_COMMENTS"],
    mutationFn: async (payload) => await createComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENTS"] });
      // queryClient.refetchQueries({ queryKey: ["GET_POSTS"], exact: true });
      toast.success("Comment added successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add comment!");
    },
  });
};
