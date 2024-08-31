'use client';
import { Button } from "@/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/ui/input";
import { useState } from "react";

interface UploadProps {
  onClose: () => void;
  userId: string | undefined;
}

export function Folder({ onClose, userId }: UploadProps) {
  const [folderName, setFolderName] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCreateFolder = async () => {
    if (!folderName || !userId) {
      console.log(folderName);
      console.log(userId);
      alert('Please enter a folder name and ensure the user is logged in.');
      return;
    }

    try {
      const response = await fetch('https://cloudflare-backend.chaniyara-harsh26.workers.dev/folder-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderName,  
          userId,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(userId);
        console.log(folderName);
        alert(`Folder created successfully: ${result}`);
      } else {
        setStatusMessage('Folder creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during folder creation:', error);
      setStatusMessage('An error occurred during the folder creation.');
    }
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Create Folder</h3>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Create Folder</span>
            </Button>
          </div>

          <div className="mb-4">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
          </div>

          <div className="flex justify-between">
            <Button onClick={handleCreateFolder}>Create Folder</Button>
            <Button onClick={onClose}>Back</Button>
          </div>

          {statusMessage && (
            <div className="mt-4 p-4 bg-gray-200 rounded">
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

