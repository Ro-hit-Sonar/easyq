import { type NextRequest, NextResponse } from "next/server";
import { QueueStore } from "@/lib/queue-store";

// DELETE /api/queue/[id]/remove - Remove customer from queue
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const queueId = params.id;
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const result = QueueStore.removeCustomer(queueId, customerId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Customer removed from queue",
    });
  } catch (error) {
    console.error("Error removing customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
