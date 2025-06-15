import { type NextRequest, NextResponse } from "next/server";
import { QueueStore } from "@/lib/queue-store";

// POST /api/queue/[id]/join - Add customer to queue
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const queueId = params.id;
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = QueueStore.addCustomer(queueId, name);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      customer: result.customer,
    });
  } catch (error) {
    console.error("Error joining queue:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
