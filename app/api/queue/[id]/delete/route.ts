import { type NextRequest, NextResponse } from "next/server"
import { QueueStore } from "@/lib/queue-store"

// DELETE /api/queue/[id]/delete - Delete entire queue
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const queueId = params.id
    const result = QueueStore.deleteQueue(queueId)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Queue deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting queue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
