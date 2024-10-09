import { PlusIcon } from "../icons";
import PTEditor from "../form/PTEditor";
import PTModal from "./PTModal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { predefinedCategories } from "@/src/constant";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreatePosts, useUpdatePost } from "@/src/hooks/post.hook";
import Loading from "../UI/Loading";
import { useUser } from "@/src/context/user.provider";

interface PostModalProps {
  isEdit?: boolean;
  postId?: string;
  initialContent?: string;
  initialCategory?: string;
  initialPremium?: boolean;
  onClose: () => void;
}

const PostModal = ({
  isEdit = false,
  postId,
  initialContent = "",
  initialCategory = "",
  initialPremium = false,
  onClose,
}: PostModalProps) => {
  const [content, setContent] = useState<string>(initialContent);
  const { handleSubmit, register } = useForm();
  const { mutate: createPost, isPending: isCreating } = useCreatePosts();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { user } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.category) return toast.error("Select Category!");
    if (!content) return toast.error("Post has no content!");

    const payload = {
      content,
      categories: data.category.split(","),
      isPremium: data.isPremium === "true",
    };

    if (isEdit && postId) {
      updatePost({ postId, ...payload });
    } else {
      createPost(payload);
    }
    onClose(); // Close modal after action
  };

  useEffect(() => {
    setContent(initialContent); // Reset content on modal open
  }, [initialContent]);

  if (isCreating || isUpdating) return <Loading />;

  return (
    <PTModal
      buttonClassName="w-full h-full"
      buttonText={isEdit ? "Edit" : "Create"}
      title={isEdit ? "Edit Post" : "Create Post"}
      buttonVariant="bordered"
      buttonColor="primary"
      buttonStartContent={<PlusIcon />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          isRequired
          label="Category"
          placeholder="Select a Category"
          className="w-full mb-2"
          selectionMode="multiple"
          defaultValue={initialCategory}
          {...register("category", { required: true })}
        >
          {predefinedCategories.map((category) => (
            <SelectItem key={category}>{category}</SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          label="Premium"
          placeholder="Is the post premium?"
          className="w-full mb-2"
          defaultValue={initialPremium ? "true" : "false"}
          {...register("isPremium", { required: true })}
        >
          <SelectItem isDisabled={!user?.isVerified} key="true">Yes</SelectItem>
          <SelectItem key="false">No</SelectItem>
        </Select>

        <PTEditor content={content} setContent={setContent} />

        <div className="flex gap-4">
          <Button className="flex-1 my-2" size="lg" type="submit">
            {isEdit ? "Update" : "Post"}
          </Button>
        </div>
      </form>
    </PTModal>
  );
};

export default PostModal;
