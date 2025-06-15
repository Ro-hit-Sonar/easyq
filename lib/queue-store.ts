// In-memory queue store (simulates a database)
interface QueueCustomer {
  id: string
  name: string
  position: number
  joinedAt: Date | string
  status: "waiting" | "served"
}

interface Queue {
  id: string
  name: string
  customers: QueueCustomer[]
  createdAt: Date | string
  isActive: boolean
}

// Global in-memory store
const queueStore = new Map<string, Queue>()

// Helper function to recalculate positions
const recalculatePositions = (customers: QueueCustomer[]): QueueCustomer[] => {
  const waitingCustomers = customers.filter((c) => c.status === "waiting")
  const servedCustomers = customers.filter((c) => c.status === "served")

  const reorderedWaiting = waitingCustomers.map((customer, index) => ({
    ...customer,
    position: index + 1,
  }))

  return [...reorderedWaiting, ...servedCustomers]
}

export const QueueStore = {
  // Get queue by ID
  getQueue: (id: string): Queue | null => {
    const queue = queueStore.get(id) || null
    if (!queue) return null

    // Serialize dates to strings for API responses
    return {
      ...queue,
      createdAt: queue.createdAt.toISOString(),
      customers: queue.customers.map((customer) => ({
        ...customer,
        joinedAt: customer.joinedAt.toISOString(),
      })),
    }
  },

  // Create new queue
  createQueue: (id: string, name: string): Queue => {
    const queue: Queue = {
      id,
      name,
      customers: [],
      createdAt: new Date(),
      isActive: true,
    }
    queueStore.set(id, queue)
    console.log(`Queue created: ${id} - ${name}`) // Debug log
    console.log(`Total queues in store: ${queueStore.size}`) // Debug log
    return queue
  },

  // Add customer to queue
  addCustomer: (
    queueId: string,
    customerName: string,
  ): { success: boolean; customer?: QueueCustomer; error?: string } => {
    const queue = queueStore.get(queueId)
    if (!queue) {
      console.log(`Queue not found: ${queueId}`) // Debug log
      console.log(`Available queues: ${Array.from(queueStore.keys())}`) // Debug log
      return { success: false, error: "Queue not found" }
    }

    if (!queue.isActive) {
      return { success: false, error: "Queue is not active" }
    }

    // Check if customer already exists
    const existingCustomer = queue.customers.find(
      (c) => c.name.toLowerCase() === customerName.toLowerCase() && c.status === "waiting",
    )
    if (existingCustomer) {
      return { success: false, error: "Customer already in queue" }
    }

    const waitingCustomers = queue.customers.filter((c) => c.status === "waiting")
    const newCustomer: QueueCustomer = {
      id: `customer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: customerName,
      position: waitingCustomers.length + 1,
      joinedAt: new Date(),
      status: "waiting",
    }

    queue.customers.push(newCustomer)
    queue.customers = recalculatePositions(queue.customers)
    queueStore.set(queueId, queue)

    console.log(`Customer added to queue ${queueId}: ${customerName}`) // Debug log

    return { success: true, customer: newCustomer }
  },

  // Remove customer from queue
  removeCustomer: (queueId: string, customerId: string): { success: boolean; error?: string } => {
    const queue = queueStore.get(queueId)
    if (!queue) {
      return { success: false, error: "Queue not found" }
    }

    const customerIndex = queue.customers.findIndex((c) => c.id === customerId)
    if (customerIndex === -1) {
      return { success: false, error: "Customer not found" }
    }

    queue.customers.splice(customerIndex, 1)
    queue.customers = recalculatePositions(queue.customers)
    queueStore.set(queueId, queue)

    return { success: true }
  },

  // Mark customer as served
  serveCustomer: (queueId: string, customerId: string): { success: boolean; error?: string } => {
    const queue = queueStore.get(queueId)
    if (!queue) {
      return { success: false, error: "Queue not found" }
    }

    const customer = queue.customers.find((c) => c.id === customerId)
    if (!customer) {
      return { success: false, error: "Customer not found" }
    }

    customer.status = "served"
    queue.customers = recalculatePositions(queue.customers)
    queueStore.set(queueId, queue)

    return { success: true }
  },

  // Delete entire queue
  deleteQueue: (queueId: string): { success: boolean; error?: string } => {
    if (!queueStore.has(queueId)) {
      return { success: false, error: "Queue not found" }
    }

    queueStore.delete(queueId)
    return { success: true }
  },

  // Get all queues (for admin dashboard)
  getAllQueues: (): Queue[] => {
    console.log(`Getting all queues. Store size: ${queueStore.size}`) // Debug log

    const queues = Array.from(queueStore.values())
    console.log(`Found ${queues.length} queues in store`) // Debug log

    return queues.map((queue) => ({
      ...queue,
      createdAt: typeof queue.createdAt === "string" ? queue.createdAt : queue.createdAt.toISOString(),
      customers: queue.customers.map((customer) => ({
        ...customer,
        joinedAt: typeof customer.joinedAt === "string" ? customer.joinedAt : customer.joinedAt.toISOString(),
      })),
    }))
  },

  // Initialize with some demo data
  initializeDemoData: () => {
    console.log("Checking demo data initialization...") // Debug log
    console.log(`Current queue store size: ${queueStore.size}`) // Debug log

    // Always ensure demo queues exist
    if (!queueStore.has("demo-queue-123")) {
      console.log("Creating demo-queue-123...") // Debug log
      const demoQueue1 = {
        id: "demo-queue-123",
        name: "Customer Service",
        customers: [],
        createdAt: new Date(),
        isActive: true,
      }
      queueStore.set("demo-queue-123", demoQueue1)

      // Add demo customers
      QueueStore.addCustomer("demo-queue-123", "Alice Johnson")
      QueueStore.addCustomer("demo-queue-123", "Bob Smith")
      QueueStore.addCustomer("demo-queue-123", "Carol Davis")
    }

    if (!queueStore.has("demo-queue-456")) {
      console.log("Creating demo-queue-456...") // Debug log
      const demoQueue2 = {
        id: "demo-queue-456",
        name: "Appointments",
        customers: [],
        createdAt: new Date(),
        isActive: true,
      }
      queueStore.set("demo-queue-456", demoQueue2)

      // Add demo customers
      QueueStore.addCustomer("demo-queue-456", "David Wilson")
      QueueStore.addCustomer("demo-queue-456", "Emma Brown")
    }

    console.log(`Demo data initialized. Total queues: ${queueStore.size}`) // Debug log
  },

  // Debug function to list all queues
  debugListQueues: () => {
    console.log("=== QUEUE STORE DEBUG ===")
    console.log(`Total queues: ${queueStore.size}`)
    queueStore.forEach((queue, id) => {
      console.log(`Queue ${id}: ${queue.name} (${queue.customers.length} customers)`)
    })
    console.log("========================")
  },

  // Add a method to ensure queue exists
  ensureQueueExists: (id: string): boolean => {
    return queueStore.has(id)
  },
}

// Initialize demo data on server start
QueueStore.initializeDemoData()
