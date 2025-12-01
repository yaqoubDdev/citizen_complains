import { Problem, User } from "./types"

export let PROBLEMS: Problem[] = [
    {
        id: "1",
        title: "Broken Street Light",
        description: "The street light at the corner of Main St and 5th Ave has been out for a week. It's very dark and dangerous at night.",
        category: "infrastructure",
        location: {
            lat: 51.505,
            lng: -0.09,
            address: "Main St & 5th Ave",
        },
        upvotes: 15,
        status: "open",
        createdAt: "2023-10-25T10:00:00Z",
        imageUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "2",
        title: "Uncollected Garbage",
        description: "Garbage hasn't been collected in 2 weeks. The smell is terrible.",
        category: "sanitation",
        location: {
            lat: 51.51,
            lng: -0.1,
            address: "123 Residential Rd",
        },
        upvotes: 42,
        status: "open",
        createdAt: "2023-10-26T09:30:00Z",
        imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "3",
        title: "Pothole on Highway",
        description: "Large pothole causing tire damage.",
        category: "infrastructure",
        location: {
            lat: 51.515,
            lng: -0.09,
            address: "Highway 1",
        },
        upvotes: 8,
        status: "in-progress",
        createdAt: "2023-10-27T14:15:00Z",
        imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1000",
    },
]

export const MOCK_USERS: User[] = [
    {
        username: "citizen1",
        password: "password123",
    },
    {
        username: "admin",
        password: "adminpassword",
    },
]
