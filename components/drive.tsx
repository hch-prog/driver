'use client'
import React, { useState } from 'react';
import Link from "next/link";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Upload } from './upload';
import { Folder } from './Folder';

export function Drive() {
  const [userId, setUserId] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [showFolder, setShowFolder] = useState(false);

  const handleFetchFiles = async () => {
    if (!userId) {
      alert('Please enter a user ID.');
      console.log('No user ID provided.');
      return;
    }

    console.log(`Fetching files for user ID: ${userId}`);
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      if (!baseUrl) {
        alert("Base URL is not defined");
        return;
      }
      const response = await fetch(`${baseUrl}/api/get-user-files?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Files fetched successfully:', data.files);
        setFiles(data.files);
      } else {
        console.error('Failed to fetch files. Status:', response.status);
        alert('Failed to fetch files. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('An error occurred while fetching files.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleFetchFiles();
    }
  };

  const handleFileClick = (fileId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
    if (!baseUrl) {
      alert("Base URL for the backend is not defined");
      return;
    }
    const url = `${baseUrl}/get-file/${fileId}`;
    window.open(url, '_blank');
  };

  const handleSignOut = async () => {
    console.log("Signing out...");
    try {
      await signOut({ redirect: false });
      console.log("Signed out successfully. Redirecting to home...");
      router.push('/');
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleUpload = () => {
    setShowUpload(!showUpload);
    setShowFolder(false); 
  };

  const handleFolder = () => {
    setShowFolder(!showFolder);
    setShowUpload(false); 
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <HardDriveDownloadIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Arc</span>
        </Link>

        <div className="flex items-center gap-2">
          <label>
            Enter userId:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter userId"
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </label>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleFetchFiles}>
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button onClick={handleFetchFiles} style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Enter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Arc Drive</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="bg-muted/20 border-r hidden md:flex flex-col gap-2 p-4">
          <Button variant="ghost" className="justify-start gap-2 px-2">
            <PlusIcon className="h-5 w-5" />
            New
          </Button>
          <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleUpload}>
            <UploadIcon className="h-5 w-5" />
            Upload
          </Button>
          <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleFolder}>
            <FolderIcon className="h-5 w-5" />
            Folders
          </Button>
          <Button variant="ghost" className="justify-start gap-2 px-2">
            <FileIcon className="h-5 w-5" />
            Files
          </Button>
          <Button variant="ghost" className="justify-start gap-2 px-2">
            <TrashIcon className="h-5 w-5" />
            Trash
          </Button>
        </aside>
        <main className={`flex-1 p-4 sm:p-6 relative`}>
          {(showUpload || showFolder) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                {showUpload && <Upload />}
                {showFolder && <Folder />}
              </div>
            </div>
          )}
          {!showUpload && !showFolder && (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">My Drive</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <LayoutGridIcon className="h-5 w-5" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ListIcon className="h-5 w-5" />
                    <span className="sr-only">List view</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
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
          )}
        </main>
      </div>
    </div>
  );
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
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h.01" />
      <path d="M10 18h.01" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}

function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

