"use client";
import { useAddComment } from "@/src/hooks/comment.hook";
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const { mutate: addComment, isPending } = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addComment({ content, post: postId });
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      <Button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={!content || isPending}
      >
        {isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
