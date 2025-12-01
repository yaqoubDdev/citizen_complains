import { useState, useRef } from "react"
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
import { Plus, Upload, Mic, Video, X, StopCircle, Loader2, MapPin, Trash2, Lightbulb, Shield, HelpCircle, Camera } from "lucide-react"

interface ReportModalProps {
    onSubmit: (data: any) => void
}

export function ReportModal({ onSubmit }: ReportModalProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("infrastructure")
    const [address, setAddress] = useState("")

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        if (e.target.files && e.target.files[0]) {
            if (type === "image") setImageFile(e.target.files[0])
            if (type === "video") setVideoFile(e.target.files[0])
        }
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
                setAudioBlob(audioBlob)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (error) {
            console.error("Error accessing microphone:", error)
            alert("Could not access microphone")
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const convertToBase64 = (file: File | Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    }

    const handleLocationClick = () => {
        // Mock location for now
        setAddress("123 Current Location St")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl, videoUrl, audioUrl

            // Convert to Base64 instead of uploading to server
            if (imageFile) imageUrl = await convertToBase64(imageFile)
            if (videoFile) videoUrl = await convertToBase64(videoFile)
            if (audioBlob) audioUrl = await convertToBase64(audioBlob)

            // Auto-generate title if missing
            const finalTitle = title || `Report - ${new Date().toLocaleDateString()}`
            const finalDescription = description || "No written description provided."

            onSubmit({
                title: finalTitle,
                description: finalDescription,
                category,
                location: {
                    lat: 51.505 + (Math.random() - 0.5) * 0.01,
                    lng: -0.09 + (Math.random() - 0.5) * 0.01,
                    address: address || "Unknown Location",
                },
                imageUrl,
                videoUrl,
                audioUrl,
            })

            setOpen(false)
            setTitle("")
            setDescription("")
            setAddress("")
            setImageFile(null)
            setVideoFile(null)
            setAudioBlob(null)
            setShowDetails(false)
        } catch (error) {
            console.error("Error submitting report:", error)
            alert("Failed to create report. Please try again.")
        } finally {
            setIsUploading(false)
        }
    }

    const categories = [
        { id: "infrastructure", label: "Road/Light", icon: Lightbulb },
        { id: "sanitation", label: "Trash", icon: Trash2 },
        { id: "safety", label: "Safety", icon: Shield },
        { id: "other", label: "Other", icon: HelpCircle },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg rounded-full h-12 px-6">
                    <Plus className="h-5 w-5" /> Report Problem
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">What is the problem?</DialogTitle>
                        <DialogDescription className="text-center">
                            Tap an icon, take a photo, or record a message.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6">
                        {/* 1. Visual Category Selector */}
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${category === cat.id
                                        ? "border-primary bg-primary/10"
                                        : "border-muted hover:border-primary/50"
                                        }`}
                                    onClick={() => setCategory(cat.id)}
                                >
                                    <cat.icon className={`h-8 w-8 mb-2 ${category === cat.id ? "text-primary" : "text-muted-foreground"}`} />
                                    <span className={`font-medium ${category === cat.id ? "text-primary" : "text-muted-foreground"}`}>
                                        {cat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 2. Large Media Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Camera / Photo */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                    onChange={(e) => handleFileChange(e, "image")}
                                />
                                <Label
                                    htmlFor="image-upload"
                                    className={`flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all ${imageFile ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
                                        }`}
                                >
                                    <Camera className="h-8 w-8 mb-2 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {imageFile ? "Photo Added" : "Take Photo"}
                                    </span>
                                </Label>
                                {imageFile && (
                                    <div className="absolute top-2 right-2 cursor-pointer bg-destructive text-white rounded-full p-1" onClick={(e) => { e.preventDefault(); setImageFile(null); }}>
                                        <X className="h-4 w-4" />
                                    </div>
                                )}
                            </div>

                            {/* Voice Recording */}
                            <div
                                className={`flex flex-col items-center justify-center h-32 rounded-xl border-2 cursor-pointer transition-all ${isRecording ? "border-destructive bg-destructive/10" : audioBlob ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
                                    }`}
                                onClick={isRecording ? stopRecording : startRecording}
                            >
                                {isRecording ? (
                                    <StopCircle className="h-10 w-10 mb-2 text-destructive animate-pulse" />
                                ) : (
                                    <Mic className={`h-8 w-8 mb-2 ${audioBlob ? "text-primary" : "text-muted-foreground"}`} />
                                )}
                                <span className={`text-sm font-medium ${isRecording ? "text-destructive" : audioBlob ? "text-primary" : "text-muted-foreground"}`}>
                                    {isRecording ? "Stop Recording" : audioBlob ? "Message Recorded" : "Record Voice"}
                                </span>
                                {audioBlob && !isRecording && (
                                    <div className="absolute top-2 right-2 cursor-pointer bg-destructive text-white rounded-full p-1" onClick={(e) => { e.stopPropagation(); setAudioBlob(null); }}>
                                        <X className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Location Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="h-14 text-lg w-full flex items-center justify-center gap-2"
                            onClick={handleLocationClick}
                        >
                            <MapPin className="h-6 w-6 text-primary" />
                            {address || "Use My Location"}
                        </Button>

                        {/* 4. Optional Details Toggle */}
                        <div className="text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-muted-foreground"
                            >
                                {showDetails ? "Hide Details" : "Add More Details (Optional)"}
                            </Button>
                        </div>

                        {showDetails && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title (Optional)</Label>
                                    <Input
                                        id="title"
                                        placeholder="Short title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description (Optional)</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Type more details here..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Video (Optional)</Label>
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => handleFileChange(e, "video")}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isUploading}>
                            {isUploading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isUploading ? "Sending..." : "Submit Report"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
