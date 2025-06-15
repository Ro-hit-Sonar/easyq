import { type NextRequest, NextResponse } from "next/server"
import { QueueStore } from "@/lib/queue-store"

// GET /api/queue/all - Get all queues (for dashboard)
export async function GET(request: NextRequest) {
  try {
    console.log("API: Getting all queues for dashboard") // Debug log

    // Ensure demo data is initialized
    QueueStore.initializeDemoData()

    // Debug: List all available queues
    QueueStore.debugListQueues()

    const queues = QueueStore.getAllQueues()

    console.log(`API: Returning ${queues.length} queues to dashboard`) // Debug log

    return NextResponse.json({
      success: true,
      queues,
    })
  } catch (error) {
    console.error("Error fetching all queues:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
