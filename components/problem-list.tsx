import { Problem } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowBigUp, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProblemListProps {
    problems: Problem[]
    onUpvote: (id: string) => void
}

export function ProblemList({ problems, onUpvote }: ProblemListProps) {
    return (
        <div className="space-y-6">
            {problems.map((problem) => (
                <Card key={problem.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="font-bold text-primary">U</span>
                                </div>
                                <div>
                                    <CardTitle className="text-base">{problem.title}</CardTitle>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(problem.createdAt).toLocaleDateString()} • {problem.location.address}
                                    </p>
                                </div>
                            </div>
                            <Badge variant={problem.status === "resolved" ? "secondary" : "default"}>
                                {problem.status}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="px-4 pb-3">
                            <p className="text-sm">{problem.description}</p>
                        </div>

                        {problem.imageUrl && (
                            <div className="w-full bg-muted">
                                <img
                                    src={problem.imageUrl}
                                    alt={problem.title}
                                    className="w-full object-cover max-h-[500px]"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between p-2 border-t mt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`flex gap-2 ${problem.upvotes > 0 ? "text-primary" : "text-muted-foreground"}`}
                                onClick={() => onUpvote(problem.id)}
                            >
                                <ArrowBigUp className={`h-5 w-5 ${problem.upvotes > 0 ? "fill-current" : ""}`} />
                                <span className="font-bold">{problem.upvotes}</span>
                                <span className="sr-only">Upvotes</span>
                            </Button>

                            <Button variant="ghost" size="sm" className="flex gap-2 text-muted-foreground">
                                <MessageSquare className="h-5 w-5" />
                                <span>Comment</span>
                            </Button>

                            <Button variant="ghost" size="sm" className="flex gap-2 text-muted-foreground">
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
                                    className="h-5 w-5"
                                >
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                    <polyline points="16 6 12 2 8 6" />
                                    <line x1="12" x2="12" y1="2" y2="15" />
                                </svg>
                                <span>Share</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
