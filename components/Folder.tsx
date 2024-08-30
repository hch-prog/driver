'use client'
import { Button } from "@/ui/button";
import { Label } from "@radix-ui/react-label";
import { UploadIcon } from "lucide-react";
import { Input } from "@/ui/input";
import { useRouter } from "next/navigation";


export function Folder({ onClose }) {
    return (
      <div>
        <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8">
          <div className="bg-background border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Create Upload</h3>
              <Button variant="ghost" size="icon">
                <UploadIcon className="w-5 h-5" />
                <span className="sr-only">Create Folder</span>
              </Button>
            </div>
  
            <div className="mb-4">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input id="folder-name" defaultValue="Default Main Branch" />
            </div>
  
            <div className="flex justify-between">
              <Button>Create</Button>
              <Button onClick={onClose}>Back</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  