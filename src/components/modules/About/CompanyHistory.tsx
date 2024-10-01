const CompanyHistory = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid gap-4 px-2 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-gray-400">
              <h3 className="text-4xl font-bold">Our Journey</h3>
              <span className="text-sm font-bold tracking-uppercase text-foreground">
                Founded in 2022
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-400">
              {/* Our Founding */}
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-400">
                <h3 className="text-xl font-semibold tracking-wide">
                  The Beginning
                </h3>
                <time className="text-xs tracking-uppercase text-gray-400">
                  January 2022
                </time>
                <p className="mt-3">
                  Our platform was launched in January 2022 with a mission to
                  create a community-driven space for sharing tips, tricks, and
                  insights across various topics. Our goal was simple: to
                  empower people by making practical knowledge accessible and
                  easily shareable.
                </p>
              </div>
              {/* Our Mission */}
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-400">
                <h3 className="text-xl font-semibold tracking-wide">
                  Our Mission
                </h3>
                <time className="text-xs tracking-uppercase text-gray-400">
                  2022 - Present
                </time>
                <p className="mt-3">
                  Our mission is to create a thriving, user-centric social media
                  platform that encourages users to share knowledge, tips, and
                  life hacks across a wide range of subjects. Whether you're
                  into technology, lifestyle, or DIY projects, our platform
                  offers a space to both learn and contribute.
                </p>
              </div>
              {/* Our Vision */}
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-400">
                <h3 className="text-xl font-semibold tracking-wide">
                  Our Vision
                </h3>
                <time className="text-xs tracking-uppercase text-gray-400">
                  Looking Ahead
                </time>
                <p className="mt-3">
                  We envision our platform as the go-to global community for
                  sharing actionable tips and tricks. Our future plans involve
                  expanding our user base and incorporating advanced features
                  like personalized recommendations, interactive tutorials, and
                  community-led discussions to make sharing and discovering
                  knowledge even more engaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
