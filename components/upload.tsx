import { Button } from "@/ui/button";
import { Label } from "@radix-ui/react-label";
import { CloudUploadIcon, UploadIcon } from "lucide-react";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

export function Upload({ onClose }) {
    return (
      <div>
        <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8">
          <div className="bg-background border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Upload A File</h3>
              <Button variant="ghost" size="icon">
                <UploadIcon className="w-5 h-5" />
                <span className="sr-only">Upload A File</span>
              </Button>
            </div>
  
            <div className="mb-4">
              <Label htmlFor="folder-name">File Name</Label>
              <Input id="folder-name" defaultValue="Default Main Branch" />
            </div>
  
            <div className="mb-4">
              <Label htmlFor="file-description">Description</Label>
              <Textarea id="file-description" rows={3} defaultValue="Description of the file if any." />
            </div>
  
            <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center space-y-4 mb-4">
              <CloudUploadIcon className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Drag and drop files here or{" "}
                <Button variant="link" className="inline">
                  Select from device
                </Button>
              </p>
            </div>
  
            <div className="flex justify-between">
              <Button>Upload</Button>
              <Button onClick={onClose}>Back</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
