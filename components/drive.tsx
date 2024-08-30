'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Upload } from './upload';
import { Folder } from './Folder';

export function Drive() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      handleFetchFiles();
    }
  }, [session]);

  const handleFetchFiles = async () => {
    setLoading(true);

    try {
      // Your fetching logic...
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('An error occurred while fetching files.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = (fileId: string) => {
    // Your file click handling logic...
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleUpload = () => {
    setShowUpload(true);
    setShowFolder(false);
  };

  const handleFolder = () => {
    setShowFolder(true);
    setShowUpload(false);
  };

  const closeModals = () => {
    setShowUpload(false);
    setShowFolder(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <HardDriveDownloadIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Arc</span>
        </Link>

        <div className="flex items-center gap-2">
          <span>{session?.user?.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <Avatar className="w-10 h-10 border-2 border-gray-300">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>
                    {session?.user?.name ? session.user.name.charAt(0) : 'AC'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-2 bg-white shadow-lg rounded-lg z-50 bg-opacity-90 backdrop-filter backdrop-blur-sm"
            >
              <DropdownMenuLabel className="font-semibold text-lg text-gray-700">Arc Drive</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                <Link href="/settings" className="block w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-800 hover:bg-gray-100 rounded-md"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="flex flex-1">
        <main className={`flex-1 p-4 sm:p-6 relative`}>
          {(showUpload || showFolder) && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10" 
              onClick={closeModals}
            >
              <div 
                className="bg-white p-6 rounded-lg max-w-lg w-full" 
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              >
                {showUpload && <Upload onClose={closeModals} />}
                {showFolder && <Folder onClose={closeModals} />}
              </div>
            </div>
          )}

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">My Drive</div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleUpload}>
                  <UploadIcon className="h-5 w-5" />
                  Upload File
                </Button>
                <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleFolder}>
                  <FolderIcon className="h-5 w-5" />
                  Add Folder
                </Button>
              </div>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file) => (
                  <Card key={file.id} className="group" onClick={() => handleFileClick(file.id)}>
                    <CardContent className="flex flex-col gap-2">
                      <div className="bg-muted/50 rounded-md flex items-center justify-center aspect-square">
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="font-medium truncate">{file.fileName}</div>
                      <div className="text-xs text-muted-foreground truncate">{(file.size / 1024).toFixed(2)} KB</div>
                    </CardContent>
                    <CardFooter className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function HardDriveDownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hard-drive-download">
      <path d="M12 2v8" />
      <path d="M16 6L12 10 8 6" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h.01" />
      <path d="M10 18h.01" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
