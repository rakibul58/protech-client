export default function RecommendedUserSkeleton() {
  return (
    <div className="border-b flex justify-between items-center gap-3 p-2 animate-pulse">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="w-28 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
}
