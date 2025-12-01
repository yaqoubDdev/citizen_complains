"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { ProblemList } from "@/components/problem-list"
import { ReportModal } from "@/components/report-modal"
import { Problem } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"



export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([])
  const { user } = useAuth()

  useEffect(() => {
    fetch("/api/problems")
      .then((res) => res.json())
      .then((data) => setProblems(data))
      .catch((err) => console.error("Failed to fetch problems", err))
  }, [])

  const handleUpvote = (id: string) => {
    // In a real app, we would call an API here
    setProblems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
        .sort((a, b) => b.upvotes - a.upvotes)
    )
  }

  const handleReportSubmit = async (data: any) => {
    if (!user) {
      alert("You must be logged in to report a problem.")
      return
    }

    try {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        const newProblem = await res.json()
        setProblems((prev) => [newProblem, ...prev])
      } else {
        alert("Failed to report problem")
      }
    } catch (err) {
      console.error("Error reporting problem", err)
      alert("Error reporting problem")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/10">
      <Header />
      <main className="container max-w-2xl py-6">
        <div className="mb-6 flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {user ? user.username[0].toUpperCase() : "?"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {user ? `What's happening, ${user.username}?` : "Log in to report a problem"}
              </p>
            </div>
          </div>
          <ReportModal onSubmit={handleReportSubmit} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold tracking-tight">Recent Reports</h2>
            <span className="text-sm text-muted-foreground">
              {problems.length} reports
            </span>
          </div>
          <ProblemList problems={problems} onUpvote={handleUpvote} />
        </div>
      </main>
    </div>
  )
}
