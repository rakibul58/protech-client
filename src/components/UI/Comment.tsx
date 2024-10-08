import React, { useState } from "react";
import { IComment } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

interface CommentProps {
  comment: IComment;
  onDelete: (commentId: string) => void;
  onUpdate: (commentId: string, newContent: string) => void;
  onReply: (parentCommentId: string, replyContent: string) => void;
}

export default function Comment({
  comment,
  onDelete,
  onUpdate,
  onReply,
}: CommentProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false); // Toggle for replies
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);

  const handleUpdate = () => {
    onUpdate(comment._id, editContent);
    setIsEditing(false);
  };

  const handleReply = () => {
    onReply(comment._id, replyContent);
    setReplyContent("");
    setIsReplying(false);
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
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>

        {user?._id === comment.author?._id && (
          <>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="ml-auto px-2 text-sm text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment._id)}
              className="px-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded dark:bg-gray-700"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
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
        <div className="mt-2">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="w-full px-2 py-1 border border-gray-300 rounded dark:bg-gray-700"
          />
          <button
            onClick={handleReply}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reply
          </button>
        </div>
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
              onDelete={onDelete}
              onUpdate={onUpdate}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
