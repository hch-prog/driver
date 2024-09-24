'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/ui/avatar';
import { Card, CardContent, CardFooter } from '@/ui/card';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Upload } from './upload';
import { Folder } from './Folder';
import { UploadIcon } from 'lucide-react';

export function Drive() {
  const [files, setFiles] = useState<any[]>([]);
  const [folderFiles, setFolderFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (session?.user?.email) {
      fetchUserId();
    }
  }, [session, status, router]);

  const fetchUserId = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      if (!baseUrl) {
        alert('Base URL is not defined');
        return;
      }

      const email = session?.user?.email;
      if (!email) {
        alert('User email not found in session');
        return;
      }

      const userIdResponse = await fetch(`${baseUrl}/get-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!userIdResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }

      const { userId } = await userIdResponse.json();
      setUserId(userId);

      await fetchFiles(userId);
      await fetchFolders(userId);
    } catch (error) {
      console.error('Error fetching user ID:', error);
      alert('An error occurred while fetching user ID.');
    }
  };

  const fetchFiles = async (userId: string) => {
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      const filesResponse = await fetch(`${baseUrl}/api/get-user-files?userId=${userId}`);
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        setFiles(filesData.files);
      } else {
        console.error('Failed to fetch files.');
        alert('Failed to fetch files. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('An error occurred while fetching files.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFolderFiles = async (folderName: string, userId: string) => {
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      const response = await fetch(`${baseUrl}/fetchFolderFiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderName, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setFolderFiles(data.files); // Store fetched folder files
        setPage(true); // Set the page state to true
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error fetching folder files:', error);
      alert('An error occurred while fetching folder files.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async (userId: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      const response = await fetch(`${baseUrl}/api/get-user-folder?userId=${userId}`);

      if (!response.ok) {
        console.error('Failed to fetch folders.');
        return;
      }

      const data = await response.json();
      const folderNames = data.folders.map((folder: { folderName: string }) => folder.folderName);
      setFolders(folderNames);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleFileClick = (fileId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
    if (!baseUrl) {
      alert('Base URL for the backend is not defined');
      return;
    }
    const url = `${baseUrl}/get-file/${fileId}`;
    window.open(url, '_blank');
  };

  const handleFolderClick = async (folderName: string) => {
    if (!userId) {
      alert('User ID is undefined');
      return;
    }

    setCurrentFolderName(folderName);
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      if (!baseUrl) {
        alert('Base URL is not defined');
        return;
      }

      const response = await fetch(`${baseUrl}/fetchFolderFiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderName, userId }),
      });

      const data = await response.json();
      console.log('Folder files response:', data);

      if (response.ok && data?.files?.length > 0) {
        setFolderFiles(data.files);
      } else {
        setFolderFiles([]);
        alert('No files found in this folder.');
      }

      setPage(true);
    } catch (error) {
      console.error('Error fetching folder files:', error);
      alert('An error occurred while fetching folder files.');
    } finally {
      setLoading(false);
    }
  };


  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Error during sign-out:', error);
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
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>{session?.user?.name ? session.user.name.charAt(0) : 'AC'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 bg-white shadow-lg rounded-lg z-50 bg-opacity-90 backdrop-filter backdrop-blur-sm">
              <DropdownMenuLabel className="font-semibold text-lg text-gray-700">Arc Drive</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                <Link href="/settings" className="block w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                <Link href="/help" className="block w-full">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 hover:text-red-800 hover:bg-gray-100 rounded-md">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-4 sm:p-6 relative">
          {(showUpload || showFolder) && (
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10" onClick={closeModals}>
              <div className="bg-white p-6 rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                {showUpload && <Upload onClose={closeModals} userId={userId || ''} folderName={currentFolderName} />}  {/* folderName added */}
                {showFolder && <Folder onClose={closeModals} userId={userId} />}
              </div>
            </div>
          )}

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{!page ? 'My Drive' : currentFolderName || 'No folder selected'}</div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleUpload}>
                  <UploadIcon className="h-5 w-5" />
                  Upload File
                </Button>
                {!page ? (
                  <Button variant="ghost" className="justify-start gap-2 px-2" onClick={handleFolder}>
                    <FolderIcon className="h-5 w-5" />
                    Add Folder
                  </Button>
                ) : (
                  <Button className="justify-start gap-2 px-2" onClick={() => setPage(false)}>
                    <BackIcon className="h-5 w-5" />
                    Back
                  </Button>
                )}
              </div>
            </div>

            {!page ? (
              loading ? (
                <div>Loading...</div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {folders.map((folderName) => (
                    <Card key={folderName} className="group" onClick={() => handleFolderClick(folderName)}>
                      <CardContent className="flex flex-col gap-2">
                        <div className="bg-muted/50 rounded-md flex items-center justify-center aspect-square">
                          <FolderIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="font-medium truncate">
                          {folderName.startsWith('/') ? folderName.slice(1) : folderName}
                        </div>


                      </CardContent>
                      <CardFooter className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

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
              )
            ) : (
              loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {folderFiles.length > 0 ? (
                        folderFiles.map((file) => (
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
                        ))
                      ) : (
                        <p>No files found in this folder.</p>
                      )}
                    </div>
                  </div>
                </div>
              )
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

function MoveHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
