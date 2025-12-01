"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, User as UserIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function Header() {
    const { user, login, logout } = useAuth()
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isSignupOpen, setIsSignupOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })
            if (res.ok) {
                const data = await res.json()
                login(data.username)
                setIsLoginOpen(false)
            } else {
                const data = await res.json()
                setError(data.error || "Login failed")
            }
        } catch (err) {
            setError("An error occurred")
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })
            if (res.ok) {
                const data = await res.json()
                login(data.username)
                setIsSignupOpen(false)
            } else {
                const data = await res.json()
                setError(data.error || "Signup failed")
            }
        } catch (err) {
            setError("An error occurred")
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <MapPin className="h-6 w-6" />
                        <span className="font-bold inline-block">
                            Citizen Voice
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/"
                            className="transition-colors hover:text-foreground/80 text-foreground"
                        >
                            Map
                        </Link>
                        <Link
                            href="/feed"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Feed
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search could go here */}
                    </div>
                    <nav className="flex items-center gap-2">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium flex items-center gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    {user.username}
                                </span>
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    Log Out
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            Log In
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Log In</DialogTitle>
                                            <DialogDescription>
                                                Enter your credentials to access your account.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleLogin} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="username">Username</Label>
                                                <Input
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {error && <p className="text-sm text-red-500">{error}</p>}
                                            <Button type="submit" className="w-full">
                                                Log In
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm">Sign Up</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Sign Up</DialogTitle>
                                            <DialogDescription>
                                                Create an account to report problems.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSignup} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-username">Username</Label>
                                                <Input
                                                    id="signup-username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-password">Password</Label>
                                                <Input
                                                    id="signup-password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {error && <p className="text-sm text-red-500">{error}</p>}
                                            <Button type="submit" className="w-full">
                                                Sign Up
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
