"use client";
// import { FieldValues, SubmitHandler } from "react-hook-form";
import PTEditor from "../form/PTEditor";
import { PlusIcon } from "../icons";
import PTModal from "./PTModal";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { predefinedCategories } from "@/src/constant";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreatePosts } from "@/src/hooks/post.hook";
import Loading from "../UI/Loading";

const CreatePostModal = () => {
  const [content, setContent] = useState<string>(``);
  const { handleSubmit, register } = useForm();
  const { mutate: createPost, isPending } = useCreatePosts();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(data.category.length===""){
      return toast.error("Select Category!");
    }
    if (content === ``) {
      return toast.error("Post has no content!");
    }
    createPost({ content, categories: data.category.split(",") });
  };

  if (isPending) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <PTModal
        buttonClassName="w-full h-full"
        buttonText="Create"
        title="Create Post"
        buttonVariant="bordered"
        buttonColor="primary"
        buttonStartContent={<PlusIcon />}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            isRequired
            label="Category"
            placeholder="Select a Category"
            // defaultSelectedKeys={[predefinedCategories[0]]}
            className="w-full mb-2"
            selectionMode="multiple"
            {...register("category", { required: true })}
          >
            {predefinedCategories.map((category) => (
              <SelectItem key={category}>{category}</SelectItem>
            ))}
          </Select>
          <PTEditor content={content} setContent={setContent} />
          <div>
            <Button className="w-full flex-1 my-2" size="lg" type="submit">
              {/* {isPending ? "Sending...." : "Send"} */}
              Post
            </Button>
          </div>
        </form>
      </PTModal>
    </div>
  );
};

export default CreatePostModal;
