import Analytics from "@/src/components/modules/Profile/Analytics";
import Following from "@/src/components/modules/Profile/Following";
import MyFollowers from "@/src/components/modules/Profile/MyFollowers";
import MyPosts from "@/src/components/modules/Profile/MyPosts";
import ProfileHeader from "@/src/components/modules/Profile/ProfileHeader";

export default async function UserProfile(){
  
  return (
    <div className="md:p-6 p-2 w-full md:max-w-5xl mx-auto mb-6 mt-5">
      <ProfileHeader />
      <MyPosts />
      <MyFollowers />
      <Following />
      <Analytics />
    </div>
  );
};