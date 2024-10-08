import { Button } from "@nextui-org/button";

export default function CommentFormSkeleton() {
  return (
    <form className="flex items-center space-x-3">
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      <Button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={true}
      >
        {"Post"}
      </Button>
    </form>
  );
}
