"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, Mic, Video } from "lucide-react"

interface ReportModalProps {
    onSubmit: (data: any) => void
}

export function ReportModal({ onSubmit }: ReportModalProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("infrastructure")
    const [address, setAddress] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            title,
            description,
            category,
            location: {
                lat: 51.505 + (Math.random() - 0.5) * 0.01, // Mock location near center
                lng: -0.09 + (Math.random() - 0.5) * 0.01,
                address: address || "Unknown Location",
            },
            imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000", // Mock image
        })
        setOpen(false)
        setTitle("")
        setDescription("")
        setAddress("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg">
                    <Plus className="h-4 w-4" /> Report Problem
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Report a Problem</DialogTitle>
                        <DialogDescription>
                            Describe the issue you see. Add photos or videos to help us understand.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Broken Street Light"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="infrastructure">Infrastructure</option>
                                <option value="sanitation">Sanitation</option>
                                <option value="safety">Safety</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Location (Address)</Label>
                            <Input
                                id="address"
                                placeholder="e.g. 123 Main St"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the problem in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" size="icon" title="Add Photo">
                                <Upload className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="icon" title="Add Voice Message">
                                <Mic className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" size="icon" title="Add Video">
                                <Video className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Report</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
