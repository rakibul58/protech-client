import React, { useState } from "react";
import { IComment } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import {
  useAddComment,
  useDeleteComment,
  useUpdateComment,
} from "@/src/hooks/comment.hook";
import { Button } from "@nextui-org/button";

interface CommentProps {
  comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false); // Toggle for replies
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const { mutate: addReply, isPending } = useAddComment();
  const { mutate: updateComment, isPending: isUpdatePending } =
    useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateComment({ id: comment._id, payload: { content: editContent } });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addReply({
        content: replyContent,
        post: comment.post,
        parent: comment._id,
      });
      setReplyContent("");
      setIsReplying(false);
      setShowReplies(true);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = () => {
    try {
      deleteComment({ id: comment._id });
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800 mb-2">
      <div className="flex items-center mb-2">
        <img
          src={comment.author?.profileImg}
          alt={comment.author?.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-bold">{comment.author?.name}</span>
        <span className="ml-2 text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>

        {user?._id === comment.author?._id && (
          <>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="ml-auto px-2 text-sm text-blue-500 hover:underline"
            >
              {!isEditing ? "Edit" : "Cancel Edit"}
            </button>
            <button
              onClick={() => handleDelete()}
              className="px-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="mt-2 flex items-center gap-3">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 h-full"
            disabled={editContent === comment.content || isPending}
          >
            {isUpdatePending ? "Updating..." : "Update"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {comment.content}
        </p>
      )}

      {/* Reply Button */}
      <button
        onClick={() => setIsReplying((prev) => !prev)}
        className="text-blue-500 text-xs mt-2 hover:underline mr-3"
      >
        {isReplying ? "Cancel Reply" : "Reply"}
      </button>

      {/* Reply Form */}
      {isReplying && (
        <form onSubmit={handleReply} className="mt-2 flex items-center gap-3">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 h-full"
            disabled={!replyContent || isPending}
          >
            {isPending ? "Replying..." : "Reply"}
          </Button>
        </form>
      )}

      {/* Toggle Replies Button */}
      {comment.replies && comment.replies.length > 0 && (
        <button
          onClick={() => setShowReplies((prev) => !prev)}
          className="text-blue-500 text-xs mt-3 hover:underline"
        >
          {showReplies
            ? "Hide Replies"
            : `View ${comment.replies.length} Replies`}
        </button>
      )}

      {/* Recursively render replies when showReplies is true */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 dark:border-gray-600 pl-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              //       onDelete={onDelete}
              //       onUpdate={onUpdate}
              //       onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
