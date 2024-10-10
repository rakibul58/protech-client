import PostDetailsCard from "@/src/components/UI/PostDetailsCard";
import { getPostById } from "@/src/services/PostService";


export default async function PostDetailsPage({
  params,
}: {
  params: { postId: string };
}) {
  const { data } = await getPostById(params.postId);
 
  //   console.log(post.data);
  return (
    <div>
      <PostDetailsCard post={data} />
    </div>
  );
}
