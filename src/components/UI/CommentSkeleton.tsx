export default function CommentSkeleton() {
  return (
    <div className="p-4 bg-white shadow rounded-lg dark:bg-gray-800 animate-pulse w-full">
      <div className="flex items-center mb-2 space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-300 rounded dark:bg-gray-700"></div>
          <div className="h-3 w-1/4 bg-gray-300 rounded dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-300 rounded dark:bg-gray-700"></div>
    </div>
  );
}
