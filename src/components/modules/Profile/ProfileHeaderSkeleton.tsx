export default function ProfileHeaderSkeleton() {
  return (
    <div className="animate-pulse max-w-5xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
        {/* Profile Image Skeleton */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Text and Button Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
          <div className="mt-4 flex space-x-4">
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            {/* <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
