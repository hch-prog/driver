import React, { useState } from "react";
import { Button } from "@/ui/button";
import { CloudUploadIcon, UploadIcon } from "lucide-react";

interface UploadProps {
  onClose: () => void;
  userId: string;
}

export function Upload({ onClose, userId }: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !name) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId); 
    formData.append("name", name); 

    try {
      const baseUrl=process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      const response = await fetch(`${baseUrl}/file-upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        alert(`File uploaded successfully: ${result}`);
        onClose(); 
      } else {
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upload A File</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <UploadIcon className="w-5 h-5" />
              <span className="sr-only">Upload A File</span>
            </Button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div
            className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center space-y-4 mb-4"
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                setSelectedFile(e.dataTransfer.files[0]);
                e.dataTransfer.clearData();
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <CloudUploadIcon className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Drag and drop files here or{" "}
              <label className="cursor-pointer text-blue-500 underline">
                Select from device
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </p>
            {selectedFile && (
              <p className="text-muted-foreground mt-2">
                Selected File: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={handleUpload}>Upload</Button>
            <Button onClick={onClose}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
