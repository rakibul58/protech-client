import RecommendedUserSkeleton from "@/src/components/UI/RecommendedUserSkeleton";
import { Button } from "@nextui-org/button";

export default function Page() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Recommended Profiles</h2>
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        {[...new Array(5)].map((_, postIndex: number) => (
          <div className="max-w-3xl w-full">
            <RecommendedUserSkeleton key={postIndex} />
          </div>
        ))}

        <Button variant="light" color="primary" className="mt-5">
          See More
        </Button>
      </div>
    </div>
  );
}
