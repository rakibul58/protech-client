"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import PTForm from "../../form/PTForm";
import PTInput from "../../form/PTInput";
import { Button } from "@nextui-org/button";
import { FilterIcon, PlusIcon } from "../../icons";
import CreatePostModal from "../../modals/CreatePostModal";

export default function TopSection() {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ data });
  };

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-5 items-center gap-4">
        {/* Input field: Full width on mobile, 4/5 on larger screens */}
        <div className="col-span-1 md:col-span-4">
          <PTForm onSubmit={onsubmit}>
            <PTInput
              size="md"
              label="Search...."
              name="searchTerm"
              type="text"
            />
          </PTForm>
        </div>

        {/* Button Section: Icon-only on small screens, full buttons on larger screens */}
        <div className="flex justify-between w-full gap-3">
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
