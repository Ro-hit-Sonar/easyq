import { type NextRequest, NextResponse } from "next/server"
import { QueueStore } from "@/lib/queue-store"

// POST /api/queue/create - Create new queue
export async function POST(request: NextRequest) {
  try {
    console.log("API: Create queue endpoint called") // Debug log

    const body = await request.json()
    console.log("API: Request body:", body) // Debug log

    const { name } = body

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      console.log("API: Invalid queue name provided") // Debug log
      return NextResponse.json({ error: "Queue name is required" }, { status: 400 })
    }

    // Generate unique queue ID
    const queueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    console.log(`API: Creating queue ${queueId} with name "${name}"`) // Debug log

    const queue = QueueStore.createQueue(queueId, name.trim())

    console.log(`API: Queue created successfully: ${queueId}`) // Debug log
    QueueStore.debugListQueues() // Debug log

    // Return the queue with proper serialization
    const serializedQueue = {
      ...queue,
      createdAt: queue.createdAt.toISOString(),
      customers: queue.customers.map((customer) => ({
        ...customer,
        joinedAt: customer.joinedAt.toISOString(),
      })),
    }

    return NextResponse.json({
      success: true,
      queue: serializedQueue,
      message: `Queue "${name}" created successfully`,
    })
  } catch (error) {
    console.error("Error creating queue:", error)
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
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
