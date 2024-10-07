"use client";

import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { FilterIcon } from "../../icons";
import CreatePostModal from "../../modals/CreatePostModal";
import { Input } from "@nextui-org/input";
import { useDebounce } from "@/src/hooks/debounce.hook";
import { useEffect } from "react";
import { predefinedCategories } from "@/src/constant";
import { Select, SelectItem } from "@nextui-org/select";

export default function TopSection({
  onSearch,
  setCategory,
  setSort
}: {
  onSearch: (term: string) => void;
  setCategory: (category: string) => void;
  setSort: (category: string) => void;
}) {
  const { register, watch } = useForm(); // Watch form inputs
  const searchTerm = watch("searchTerm"); // Watch the searchTerm input

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Trigger onSearch with the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm); // Pass the debounced search term to parent
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center gap-4">
        {/* Input field: Full width on mobile, 4/5 on larger screens */}
        <div className="md:w-[40%] w-full">
          <form>
            <Input
              {...register("searchTerm")}
              size="sm"
              label="Search...."
              name="searchTerm"
              type="text"
              className="w-full"
              isClearable
              onClear={() => onSearch("")}
              onKeyPress={handleKeyPress}
            />
          </form>
        </div>

        {/* Button Section: Icon-only on small screens, full buttons on larger screens */}
        <div className="flex justify-between gap-3 md:w-[60%] w-full box-border flex-wrap-reverse md:flex-nowrap">
          <Select
            label="Sort By"
            placeholder="Select sort parameter"
            size="sm"
            className="w-full"
            onChange={(e)=>setSort(e.target.value)}
          >
            <SelectItem value='-upvoteCount' key="-upvoteCount">Upvote</SelectItem>
            <SelectItem value='-downvoteCount' key="-downvoteCount">Downvote</SelectItem>
          </Select>
          <Select
            label="Filter By Category"
            placeholder="Select a category"
            size="sm"
            className="w-full"
            onChange={(e)=>setCategory(e.target.value)}
          >
            {predefinedCategories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </Select>
          {/* <Button
              color="secondary"
              variant="bordered"
              className="w-full py-3"
              startContent={<PlusIcon />}
              aria-label="Create"
            >
              <span className="hidden md:inline">Create</span>
            </Button> */}
          <CreatePostModal />
        </div>
      </div>
    </div>
  );
}
