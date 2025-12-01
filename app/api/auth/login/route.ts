import { NextResponse } from "next/server"
import { MOCK_USERS } from "@/lib/data"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body

        const user = MOCK_USERS.find((u) => u.username === username && u.password === password)

        if (user) {
            // Return user without password
            const { password, ...userWithoutPassword } = user
            return NextResponse.json(userWithoutPassword)
        } else {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
