"use client";

import {
  useDeletePost,
  useGetMyPosts,
  useUpdatePost,
} from "@/src/hooks/post.hook";
import { useState } from "react";
import AnalyticsSkeleton from "./AnalyticsSkeleton";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { IPost } from "@/src/types";
import Link from "next/link";
import { useDebounce } from "@/src/hooks/debounce.hook";
import EditPostModal from "./EditPostModal";
import { toast } from "sonner";
import { predefinedCategories } from "@/src/constant";

const MyPosts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("-createdAt");
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const limit = 5;

  // Apply debouncing to searchTerm
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: myPosts, isPending } = useGetMyPosts(
    currentPage,
    debouncedSearchTerm,
    category,
    sort,
    limit
  );

  const { mutate: updatePost, isPending: updatePending } = useUpdatePost();
  const { mutate: deletePost, isPending: deletePending } = useDeletePost();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleEdit = (post: IPost) => {
    setEditingPost(post);
  };

  const handleSavePost = (data: {
    postId: string;
    payload: { content: string };
  }) => {
    if (editingPost) {
      updatePost(data);
      setEditingPost(null);
    }
  };

  const handleDelete = (postId: string) => {
    deletePost({ postId });
  };

  if (isPending || updatePending || deletePending) return <AnalyticsSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">My Posts</h2>

        {/* Search, Filter, and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search Posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded-lg w-full md:w-1/3"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border rounded-lg w-full md:w-1/3"
          >
            <option value="">All Categories</option>
            {predefinedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2 border rounded-lg w-full md:w-1/3"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-upvoteCount">Most UpVoted</option>
            <option value="-downvoteCount">Most DownVoted</option>
          </select>
        </div>

        <Table aria-label="My Posts Table" className="w-full">
          <TableHeader>
            <TableColumn>Post</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Date Created</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>UpVotes</TableColumn>
            <TableColumn>DownVotes</TableColumn>
            <TableColumn>Comments</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {myPosts?.result.map((post: IPost) => (
              <TableRow key={post._id}>
                <TableCell>
                  <Link
                    className="hover:text-blue-400"
                    href={`/user/post/${post._id}`}
                  >
                    Show
                  </Link>
                </TableCell>
                <TableCell>{post.categories.join(", ")}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{post.isPremium ? "Premium" : "Free"}</TableCell>
                <TableCell>{post.upvoteCount}</TableCell>
                <TableCell>{post.downvoteCount}</TableCell>
                <TableCell>{post.comments?.length}</TableCell>
                <TableCell className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          showControls
          total={myPosts?.totalPage || 1}
          boundaries={1}
          page={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
          className="w-fit self-center"
        />
      </div>

      {/* Render EditPostModal */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onSave={handleSavePost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
};

export default MyPosts;
