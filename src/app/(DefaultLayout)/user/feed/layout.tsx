export default function Layout({
  children,
  recommended,
  followers,
  followed,
  posts,
}: {
  children: React.ReactNode;
  recommended: React.ReactNode;
  followers: React.ReactNode;
  followed: React.ReactNode;
  posts: React.ReactNode;
}) {
  return (
    <div className="w-full box-border">
      {/* Sticky Top Section */}

      {/* Content with responsive design */}
      <div className="hidden">{children}</div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        {/* Recommended Section (Left Side) - Hidden on small screens */}

        {/* Posts Section (Center) */}
        <div className="col-span-12 lg:col-span-7">{posts}</div>

        {/* Followers and Followed Section (Right Side) - Hidden on small screens */}
        <div className="hidden lg:block lg:col-span-5 space-y-6">
          <div className="sticky top-40 space-y-6">
            <div className="mb-6">
              <div className="w-full"> {recommended}</div>
            </div>
            {/* <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">My Followers</h2>
              {followers}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Followed Profiles</h2>
              {followed}
            </div> */}
          </div>
        </div>

        {/* <div className="md:hidden block w-full fixed bottom-0 left-0 right-0 z-50 bg-white p-5 bg-opacity-70 backdrop-blur-md col-span-12 lg:col-span-12">
          {children}
        </div> */}
      </div>
    </div>
  );
}
