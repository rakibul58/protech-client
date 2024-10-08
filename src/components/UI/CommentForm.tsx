"use client"
import { Button } from "@nextui-org/button";
import { useState } from "react";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: any) => void;
}

export default function CommentForm({
  postId,
  onCommentAdded,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.post(`/comments`, {
//         postId,
//         content,
//       });
//       onCommentAdded(data.result);
//       setContent("");
//     } catch (error) {
//       console.error("Failed to add comment:", error);
//     } finally {
//       setLoading(false);
//     }
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
        disabled={!content || loading}
      >
        {loading ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
