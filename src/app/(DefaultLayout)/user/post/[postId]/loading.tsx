import PostCardSkeleton from "@/src/components/UI/PostCardSkeleton";

export default function loading(){
  return (
    <div className="mt-5 w-full md:max-w-4xl mx-auto">
      <PostCardSkeleton />
    </div>
  );
};