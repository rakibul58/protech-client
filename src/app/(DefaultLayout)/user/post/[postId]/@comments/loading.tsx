import CommentFormSkeleton from "@/src/components/UI/CommentFormSkeleton";
import CommentSkeleton from "@/src/components/UI/CommentSkeleton";

export default function loading() {
  return (
    <div className="p-4 w-full md:max-w-4xl mx-auto mb-6 mt-5">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      <CommentFormSkeleton />
      <div className="mt-4 space-y-4">
        {[...new Array(5)].map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
