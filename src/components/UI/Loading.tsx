import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
  return (
    <div className="h-screen bg-gray-900/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <CircularProgress size="lg" color="default" aria-label="Loading..." />
    </div>
  );
}
