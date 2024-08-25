'use client'
import Link from "next/link"
import { useState } from "react";
import Features from "./Features";
import Pricing from "./Pricing";
import About from "./about";
import Contact from "./contact";




export function Dashboard() {
  const [selected, setSelected] = useState("");

  const contentComponents:any = {
    Features: <Features />,
    Pricing:<Pricing/>,
    About:<About/>,
    Contact:<Contact/>


  };
 
  const handleClick = (section: any) => {
    setSelected(section);
  };
  return (

    <div className="flex flex-col min-h-[100dvh]">


      <header className="flex h-20 items-center justify-between px-6 border-b">
        <Link href="#" className="flex items-center gap-2" onClick={() => setSelected("")} prefetch={false}>
          <HardDriveDownloadIcon className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold text-foreground">Arc</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["Features", "Pricing", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`text-sm font-medium hover:underline underline-offset-4 ${selected === item ? 'text-[#007bff]' : 'text-black'
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>



      <main className="flex-1">
        {selected ? contentComponents[selected] : (
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f5f5f5]">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#e6e6e6] px-3 py-1 text-sm">Arc Drive</div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Effortless File Management
                    </h1>
                    <p className="max-w-[600px] text-[#666] md:text-xl">
                      Streamline your digital life with our powerful drive app. Store, access, and share your files
                      securely from anywhere.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="/signin"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#007bff] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0056b3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-[#ccc] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#f2f2f2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center">
                  <HardDriveIcon className="h-24 w-24 text-[#007bff] mt-8" />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <CloudIcon className="h-12 w-12 text-[#007bff]" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Cloud Storage</h3>
                  <p className="text-[#666]">Store your files securely in the cloud and access them from anywhere.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <FolderSyncIcon className="h-12 w-12 text-[#007bff]" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Seamless Sync</h3>
                  <p className="text-[#666]">Automatically sync your files across all your devices for easy access.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <ShareIcon className="h-12 w-12 text-[#007bff]" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Secure Sharing</h3>
                  <p className="text-[#666]">Share your files with others securely and control access permissions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col sm:flex-row items-center justify-between py-6 w-full px-4 md:px-6 border-t">
        <p className="text-xs text-[#666] flex-1 text-left">&copy; 2024 Drive App. All rights reserved.</p>

        <p className="text-xs text-[#666] mx-auto">Developed By Harsh</p>

        <nav className="flex-1 flex justify-end gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Github
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>

    </div>
  )
}

function HardDriveDownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hard-drive-download"
    >
      
      <path d="M12 2v8" />
      <path d="M16 6L12 10 8 6" />
      <rect width="20" height="8" x="2" y="14" rx="2"/>
      <path d="M6 18h.01" />
      <path d="M10 18h.01" />
    </svg>
  );
}



function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function FolderSyncIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
    </svg>
  )
}

function HardDriveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="12" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" x2="6.01" y1="16" y2="16" />
      <line x1="10" x2="10.01" y1="16" y2="16" />
    </svg>
  )
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
