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
        <div className="space-y-4 p-4">
            {problems.map((problem) => (
                <Card key={problem.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex">
                        <div className="flex flex-col items-center justify-start bg-muted/30 p-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex h-auto flex-col gap-1 px-2 hover:bg-transparent hover:text-primary"
                                onClick={() => onUpvote(problem.id)}
                            >
                                <ArrowBigUp className="h-8 w-8" />
                                <span className="font-bold">{problem.upvotes}</span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                                    <Badge variant={problem.status === "resolved" ? "secondary" : "default"}>
                                        {problem.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{problem.location.address}</p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                                    {problem.description}
                                </p>
                                {problem.imageUrl && (
                                    <div className="mb-3 h-32 w-full overflow-hidden rounded-md bg-muted">
                                        <img
                                            src={problem.imageUrl}
                                            alt={problem.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="h-3 w-3" /> 0 comments
                                    </span>
                                    <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
