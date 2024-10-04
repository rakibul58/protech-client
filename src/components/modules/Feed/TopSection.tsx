"use client";

import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { FilterIcon } from "../../icons";
import CreatePostModal from "../../modals/CreatePostModal";
import { Input } from "@nextui-org/input";
import { useDebounce } from "@/src/hooks/debounce.hook";
import { useEffect } from "react";

export default function TopSection({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const { register, watch } = useForm(); // Watch form inputs
  const searchTerm = watch("searchTerm"); // Watch the searchTerm input

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Use debounce with 300ms delay

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
        <div className="md:w-[80%] w-full">
          <form>
            <Input
              {...register("searchTerm")}
              size="md"
              label="Search...."
              name="searchTerm"
              type="text"
              className="w-full"
              onKeyPress={handleKeyPress}
            />
          </form>
        </div>

        {/* Button Section: Icon-only on small screens, full buttons on larger screens */}
        <div className="flex justify-between gap-3 md:w-[20%] w-full">
          <Button
            color="primary"
            variant="bordered"
            className="w-full py-3"
            startContent={<FilterIcon />}
            aria-label="Filter"
          >
            Filter
          </Button>
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
