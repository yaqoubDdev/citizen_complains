import { NextResponse } from "next/server"
import { MOCK_USERS } from "@/lib/data"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body

        if (MOCK_USERS.find((u) => u.username === username)) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const newUser = { username, password }
        MOCK_USERS.push(newUser)

        const { password: _, ...userWithoutPassword } = newUser
        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
