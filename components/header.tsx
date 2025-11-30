import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <MapPin className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            Citizen Voice
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
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
                    <nav className="flex items-center">
                        <Button variant="ghost" size="sm">
                            Log In
                        </Button>
                        <Button size="sm">
                            Sign Up
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
