import { IPost, IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  ArrowDownCircleIcon,
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function PostCard({ post }: { post: IPost }) {
  const postRef = useRef<HTMLDivElement | null>(null); // Create a reference to the post content

  const handleDownloadPDF = async () => {
    if (postRef.current) {
      const element = postRef.current;

      // Apply a temporary class to add padding/margins to images
      element.querySelectorAll("img").forEach((img) => {
        img.style.padding = "10px 0"; // Add padding to both top and bottom of images
      });

      // Capture the post content as an image with higher scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2, // Adjust for better quality
        useCORS: true, // Support cross-origin images
        allowTaint: true, // Allow tainted canvas
        logging: true,
        width: element.scrollWidth, // Ensure full width is captured
        height: element.scrollHeight + 20, // Add extra space to prevent clipping at the bottom
        scrollY: -window.scrollY, // Ensure content is captured even when scrolled
      });

      const imageData = canvas.toDataURL("image/jpeg", 1.0);

      // Get dimensions of the captured canvas
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Define padding for the sides of the PDF (e.g., 20px)
      const sidePadding = 20;

      // Calculate the available width after adding padding
      const pdfWidth = imgWidth + 2 * sidePadding;
      const pdfHeight = imgHeight;

      // Initialize jsPDF with appropriate page size, adding side padding
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "landscape" : "portrait",
        unit: "px",
        format: [pdfWidth, pdfHeight], // Adjust the width to include padding
      });

      // Add the image to the PDF with side padding
      pdf.addImage(imageData, "JPEG", sidePadding, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`${(post?.author as IUser)?.name}-${new Date(post.createdAt).toLocaleString()}.pdf`);

      // Optional: Remove the temporary padding/margin modifications if needed
      element.querySelectorAll("img").forEach((img) => {
        img.style.padding = ""; // Reset padding if needed
      });
    }
  };

  // const [isFollowed, setIsFollowed] = useState(followed);
  // const [upvotesCount, setUpvotesCount] = useState(post.upvotes.length);
  // const [downvotesCount, setDownvotesCount] = useState(post.downvotes.length);

  // const handleFollow = () => {
  //   setIsFollowed(true);
  //   // Logic for following the user
  // };

  // const handleUpvote = () => {
  //   setUpvotesCount((prev) => prev + 1);
  //   // Logic to update the upvote count
  // };

  // const handleDownvote = () => {
  //   setDownvotesCount((prev) => prev + 1);
  //   // Logic to update the downvote count
  // };

  // if (loading) {
  //   return <PostCardSkeleton />;
  // }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg w-full mb-6">
      {/* Post Header - Author and Time */}
      <div className="flex items-center mb-4">
        {/* Profile Picture */}
        <img
          src={(post?.author as IUser)?.profileImg}
          alt={(post?.author as IUser)?.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        {/* Author Name and Post Time */}
        <div>
          <h4 className="text-lg font-bold dark:text-white">
            {(post?.author as IUser)?.name}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div ref={postRef} className="mb-4">
        <div
          className="text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        {post.categories.map((category, index) => (
          <span
            key={index}
            className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded-lg mr-2"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Post Interactions */}
      <div className="flex justify-between items-center">
        {/* Upvotes, Downvotes, Comments */}
        <div className="flex space-x-4 items-center">
          {/* Upvote Button */}
          <Button
            isIconOnly
            color="primary"
            variant="light"
            className="flex items-center space-x-2"
            // onClick={handleUpvote}
          >
            <HandThumbUpIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <span className="dark:text-white">{post?.upvotes?.length}</span>
          </Button>

          {/* Downvote Button */}
          <Button
            isIconOnly
            color="secondary"
            variant="light"
            className="flex items-center space-x-2"
            // onClick={handleDownvote}
          >
            <HandThumbDownIcon className="w-6 h-6 text-red-500 dark:text-red-400" />
            <span className="dark:text-white">{post?.downvotes?.length}</span>
          </Button>

          {/* Comment Icon */}
          <Button
            isIconOnly
            color="default"
            variant="light"
            className="flex items-center space-x-2"
          >
            <ChatBubbleLeftIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <span className="dark:text-white">
              {post?.comments ? post?.comments?.length : 0}
            </span>
          </Button>

          <Button
            isIconOnly
            color="warning"
            variant="flat"
            className="flex items-center space-x-2"
            onClick={() => handleDownloadPDF()}
          >
            <ArrowDownCircleIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Follow Button
        {true && (
          <Button
            // onClick={handleFollow}
            color="primary"
            variant="solid"
            className="flex items-center space-x-1"
          >
            <UserPlusIcon className="w-6 h-6 text-white" />
            <span>Follow</span>
          </Button>
        )} */}
      </div>
    </div>
  );
}
