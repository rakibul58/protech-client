import Analytics from "@/src/components/modules/Profile/Analytics";
import MyPosts from "@/src/components/modules/Profile/MyPosts";
import ProfileHeader from "@/src/components/modules/Profile/ProfileHeader";

export default async function UserProfile(){
  
  return (
    <div className="p-6 w-full md:max-w-4xl mx-auto mb-6 mt-5">
      <ProfileHeader />
      <MyPosts />
      <Analytics />
    </div>
  );
};