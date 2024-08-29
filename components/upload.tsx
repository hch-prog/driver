import { Button } from "@/ui/button";
import { Label } from "@radix-ui/react-label";
import { SettingsIcon } from "lucide-react";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select"
import { Textarea } from "@/ui/textarea"
import { Progress } from "@/ui/progress"

export function Upload() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background border rounded-lg p-6 shadow-sm">
                <div className="bg-background border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Settings</h3>
                        <Button variant="ghost" size="icon">
                            <SettingsIcon className="w-5 h-5" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="file-name">File Name</Label>
                            <Input id="file-name" defaultValue="example.pdf" />
                        </div>
                        <div>
                            <Label htmlFor="file-description">Description</Label>
                            <Textarea id="file-description" rows={3} defaultValue="This is an example file." />
                        </div>
                        <div>
                            <Label htmlFor="file-permissions">Permissions</Label>
                            <Select id="file-permissions" defaultValue="public">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="shared">Shared</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="storage-usage">Storage Usage</Label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <Progress value={75} max={100} />
                                </div>
                                <span className="text-sm text-muted-foreground">75%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}