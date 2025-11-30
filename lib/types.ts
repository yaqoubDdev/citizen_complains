export interface Problem {
    id: string
    title: string
    description: string
    category: "infrastructure" | "sanitation" | "safety" | "other"
    location: {
        lat: number
        lng: number
        address?: string
    }
    upvotes: number
    status: "open" | "in-progress" | "resolved"
    createdAt: string
    imageUrl?: string
}
