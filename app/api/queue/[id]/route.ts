import { type NextRequest, NextResponse } from "next/server"
import { QueueStore } from "@/lib/queue-store"

// GET /api/queue/[id] - Get queue data
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const queueId = params.id
    console.log(`API: Getting queue ${queueId}`) // Debug log

    // Debug: List all available queues
    QueueStore.debugListQueues()

    const queue = QueueStore.getQueue(queueId)

    if (!queue) {
      console.log(`API: Queue ${queueId} not found`) // Debug log
      console.log(
        `Available queues: ${Array.from(QueueStore.getAllQueues())
          .map((q) => q.id)
          .join(", ")}`,
      )
      return NextResponse.json(
        {
          error: "Queue not found",
          queueId: queueId,
          availableQueues: QueueStore.getAllQueues().map((q) => q.id),
        },
        { status: 404 },
      )
    }

    console.log(`API: Found queue ${queueId} with ${queue.customers.length} customers`) // Debug log

    return NextResponse.json({
      success: true,
      queue,
    })
  } catch (error) {
    console.error("Error fetching queue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
