"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { ProblemList } from "@/components/problem-list"
import { ReportModal } from "@/components/report-modal"
import { MOCK_PROBLEMS } from "@/lib/data"
import { Problem } from "@/lib/types"

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS)

  const handleUpvote = (id: string) => {
    setProblems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
        .sort((a, b) => b.upvotes - a.upvotes)
    )
  }

  const handleReportSubmit = (data: any) => {
    const newProblem: Problem = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      upvotes: 0,
      status: "open",
      createdAt: new Date().toISOString(),
    }
    setProblems((prev) => [newProblem, ...prev])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
        {/* Map Section - Takes full width on mobile, 60% on desktop */}
        <div className="relative h-[50vh] w-full md:h-full md:w-[60%] lg:w-[70%] border-b md:border-b-0 md:border-r">
          <MapView problems={problems} />
          <div className="absolute bottom-6 right-6 z-[1000]">
            <ReportModal onSubmit={handleReportSubmit} />
          </div>
        </div>

        {/* Feed Section - Takes full width on mobile, 40% on desktop */}
        <div className="flex h-[50vh] w-full flex-col bg-background md:h-full md:w-[40%] lg:w-[30%]">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Local Problems</h2>
            <p className="text-sm text-muted-foreground">
              {problems.length} reports in your area
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ProblemList problems={problems} onUpvote={handleUpvote} />
          </div>
        </div>
      </main>
    </div>
  )
}
