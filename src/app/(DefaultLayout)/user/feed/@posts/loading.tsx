import PostCardSkeleton from "@/src/components/UI/PostCardSkeleton";

export default async function FeedPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      {[...Array(3)].map((_, index: number) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}
