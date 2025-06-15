import { type NextRequest, NextResponse } from "next/server";
import { QueueStore } from "@/lib/queue-store";

// POST /api/queue/[id]/serve - Mark customer as served
export async function POST(
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

    const result = QueueStore.serveCustomer(queueId, customerId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Customer marked as served",
    });
  } catch (error) {
    console.error("Error serving customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
