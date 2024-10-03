"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PTEditor from "../form/PTEditor";
import PTForm from "../form/PTForm";
import { PlusIcon } from "../icons";
import PTModal from "./PTModal";
import { useState } from "react";
import { Button } from "@nextui-org/button";

const CreatePostModal = () => {
  const [content, setContent] = useState<string>(``);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ content , data });
  };
  return (
    <PTModal
      buttonClassName="w-full"
      buttonText="Create"
      title="Create Post"
      buttonVariant="bordered"
      buttonColor="secondary"
      buttonStartContent={<PlusIcon />}
    >
      <PTForm onSubmit={onSubmit}>
        <PTEditor content={content} setContent={setContent} />
        <div>
          <Button className="w-full flex-1 my-2" size="lg" type="submit">
            {/* {isPending ? "Sending...." : "Send"} */}
            Post
          </Button>
        </div>
      </PTForm>
    </PTModal>
  );
};

export default CreatePostModal;
