import Link from "next/link";

function About() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f5f5f5]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-4 py-12">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl mb-12">
                  About
                </h1>
                <p className="max-w-[600px] text-[#666] md:text-xl">
                  Here you can find About of our application, showcasing the various capabilities and tools that enhance user experience.
                </p>

              </div>
              <div className="flex flex-col gap-2 items-center sm:flex-row sm:justify-center">
                <Link
                  href="api/auth/signin"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#007bff] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0056b3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={true}
                >
                  Sign In
                </Link>
                <Link
                  href="api/auth/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-[#ccc] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#f2f2f2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;
