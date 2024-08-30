
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import { Input } from "@/ui/input"

import { Select } from "@/ui/select"
import { Progress } from "@/ui/progress"
import { Textarea } from "@/ui/textarea"


export default function Frame() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Upload</h3>
                        <Button variant="ghost" size="icon">
                            <UploadIcon className="w-5 h-5" />
                            <span className="sr-only">Upload</span>
                        </Button>
                    </div>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
                        <CloudUploadIcon className="w-12 h-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                            Drag and drop files here or{" "}
                            <Button variant="link" className="inline">
                                select from device
                            </Button>
                        </p>
                    </div>
                </div>
               
                <div className="bg-background border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">New Folder</h3>
                        <Button variant="ghost" size="icon">
                            <FolderPlusIcon className="w-5 h-5" />
                            <span className="sr-only">New Folder</span>
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="folder-name">Folder Name</Label>
                            <Input id="folder-name" defaultValue="Documents" />
                        </div>
                        <div>
                            <Label htmlFor="folder-description">Description</Label>
                            <Textarea id="folder-description" rows={3} defaultValue="This is a new folder for documents." />
                        </div>
                        <div className="flex justify-end">
                            <Button>Create Folder</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CloudUploadIcon(props) {
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
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
        </svg>
    )
}

function FolderPlusIcon(props) {
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
            <path d="M12 10v6" />
            <path d="M9 13h6" />
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
    )
}

function SettingsIcon(props) {
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
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function UploadIcon(props) {
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