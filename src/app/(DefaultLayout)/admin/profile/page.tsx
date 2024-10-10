import AdminAnalyticsCharts from "@/src/components/modules/Profile/AdminAnalytics";
import AdminPosts from "@/src/components/modules/Profile/AdminPosts";
import AdminUserManagement from "@/src/components/modules/Profile/AdminUserManagement";
import PaymentHistory from "@/src/components/modules/Profile/PaymentHistory";
import ProfileHeader from "@/src/components/modules/Profile/ProfileHeader";

export default function AdminProfile() {
  return (
    <div className="md:p-6 p-2 w-full md:max-w-5xl mx-auto mb-6 mt-5">
      <ProfileHeader />
      <AdminUserManagement />
      <AdminPosts />
      <PaymentHistory />
      <AdminAnalyticsCharts  />
    </div>
  );
}
