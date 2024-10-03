export default function PostCardSkeleton() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg w-full mb-6 animate-pulse">
      {/* Skeleton for Author and Post Time */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-32"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-24"></div>
        </div>
      </div>

      {/* Skeleton Title */}
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4 mb-4"></div>

      {/* Skeleton Content */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-full mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-5/6 mb-4"></div>

      <div className="flex justify-between items-center">
        {/* Skeleton Buttons */}
        <div className="flex space-x-4 items-center">
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>

        <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
  );
}
