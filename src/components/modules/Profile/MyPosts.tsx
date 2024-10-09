"use client";

import { useGetMyPosts } from "@/src/hooks/post.hook";
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

export default function MyPosts() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("-createdAt");
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

  if (isPending) return <AnalyticsSkeleton />;

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
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2 border rounded-lg w-full md:w-1/3"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-upvoteCount">Most Upvoted</option>
          </select>
        </div>

        <Table aria-label="My Posts Table" className="w-full">
          <TableHeader>
            <TableColumn>Post</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Date Created</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {myPosts?.result.map((post: IPost) => (
              <TableRow key={post._id}>
                <TableCell>
                  <Link className="hover:text-blue-400" href={`/user/post/${post._id}`}>
                    Show
                  </Link>
                </TableCell>
                <TableCell>{post.categories.join(", ")}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{post.isPremium ? "Premium" : "Free"}</TableCell>
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
    </div>
  );
}
