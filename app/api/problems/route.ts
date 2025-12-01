import { NextResponse } from "next/server"
import { PROBLEMS } from "@/lib/data"
import { Problem } from "@/lib/types"

export async function GET() {
    return NextResponse.json(PROBLEMS)
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const newProblem: Problem = {
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            upvotes: 0,
            status: "open",
            ...body,
        }

        PROBLEMS.unshift(newProblem)
        return NextResponse.json(newProblem)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
