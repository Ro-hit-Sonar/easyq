"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Building2,
  Plus,
  QrCode,
  Users,
  Clock,
  CheckCircle,
  X,
  Trash2,
  Copy,
  ExternalLink,
  UserCheck,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { QRCodeDisplay } from "@/components/qr-code-display"

interface Customer {
  id: string
  name: string
  position: number
  status: "waiting" | "served"
  joinedAt: string
}

interface Queue {
  id: string
  name: string
  customers: Customer[]
  createdAt: string
  isActive: boolean
}

export default function DashboardPage() {
  const [queueName, setQueueName] = useState("")
  const [activeQueues, setActiveQueues] = useState<Queue[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all queues from API
  const fetchAllQueues = async (showLoading = false) => {
    try {
      if (showLoading) setIsLoading(true)
      setIsRefreshing(true)
      setApiError(null)

      console.log("Dashboard: Fetching all queues...") // Debug log

      const response = await fetch("/api/queue/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevent caching issues
      })

      console.log("Dashboard: Response status:", response.status) // Debug log
      console.log("Dashboard: Response headers:", response.headers) // Debug log

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Dashboard: Non-JSON response:", textResponse.substring(0, 200))
        throw new Error(`Expected JSON response but got ${contentType}. Response: ${textResponse.substring(0, 100)}...`)
      }

      const data = await response.json()

      if (!response.ok) {
        console.error("API Error:", data)
        throw new Error(data.error || `HTTP ${response.status}: Failed to fetch queues`)
      }

      console.log(`Dashboard: Fetched ${data.queues?.length || 0} queues`) // Debug log
      console.log("Dashboard: Queue data:", data.queues) // Debug log

      setActiveQueues(data.queues || [])
    } catch (error) {
      console.error("Error fetching queues:", error)

      // Show more detailed error information
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setApiError(errorMessage)

      toast({
        title: "Error loading queues",
        description: `Unable to load queue data: ${errorMessage}`,
        variant: "destructive",
      })

      // Set empty array as fallback
      setActiveQueues([])
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Load queues on component mount
  useEffect(() => {
    fetchAllQueues(true)
  }, [])

  // Auto-refresh queues every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllQueues(false)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Create new queue
  const createQueue = async () => {
    if (!queueName.trim()) {
      toast({
        title: "Queue name required",
        description: "Please enter a name for your queue.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      console.log(`Dashboard: Creating queue "${queueName}"`) // Debug log

      const response = await fetch("/api/queue/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: queueName.trim() }),
        cache: "no-store", // Prevent caching issues
      })

      console.log("Dashboard: Create response status:", response.status) // Debug log

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Dashboard: Non-JSON response:", textResponse.substring(0, 200))
        throw new Error(`Expected JSON response but got ${contentType}. This might be a routing issue.`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to create queue`)
      }

      console.log(`Dashboard: Queue created successfully: ${data.queue.id}`) // Debug log

      // Refresh all queues to get the latest data
      await fetchAllQueues(false)

      setQueueName("")

      toast({
        title: "Queue created successfully!",
        description: data.message,
      })
    } catch (error) {
      console.error("Error creating queue:", error)
      toast({
        title: "Failed to create queue",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Remove customer from queue
  const removeCustomer = async (queueId: string, customerId: string) => {
    try {
      const response = await fetch(`/api/queue/${queueId}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove customer")
      }

      // Refresh queue data
      await fetchAllQueues(false)

      toast({
        title: "Customer removed",
        description: data.message,
      })
    } catch (error) {
      console.error("Error removing customer:", error)
      toast({
        title: "Failed to remove customer",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  // Mark customer as served
  const markAsServed = async (queueId: string, customerId: string) => {
    try {
      const response = await fetch(`/api/queue/${queueId}/serve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to mark customer as served")
      }

      // Refresh queue data
      await fetchAllQueues(false)

      toast({
        title: "Customer served",
        description: data.message,
      })
    } catch (error) {
      console.error("Error serving customer:", error)
      toast({
        title: "Failed to serve customer",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  // Delete entire queue
  const deleteQueue = async (queueId: string) => {
    try {
      const response = await fetch(`/api/queue/${queueId}/delete`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete queue")
      }

      // Refresh all queues
      await fetchAllQueues(false)

      toast({
        title: "Queue deleted",
        description: data.message,
        variant: "destructive",
      })
    } catch (error) {
      console.error("Error deleting queue:", error)
      toast({
        title: "Failed to delete queue",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  // Copy queue link
  const copyQueueLink = (queueId: string) => {
    const link = `${window.location.origin}/queue/${queueId}`
    navigator.clipboard.writeText(link)

    toast({
      title: "Link copied!",
      description: "Queue link has been copied to clipboard.",
    })
  }

  const getWaitingCustomers = (customers: Customer[]) => customers.filter((c) => c.status === "waiting")

  const getServedCustomers = (customers: Customer[]) => customers.filter((c) => c.status === "served")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EasyQ Dashboard
                </h1>
                <p className="text-sm text-gray-500">Manage your digital queues</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchAllQueues(false)}
                disabled={isRefreshing}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Badge variant="secondary" className="hidden sm:flex">
                <Users className="w-3 h-3 mr-1" />
                {activeQueues.reduce((total, queue) => total + queue.customers.length, 0)} Total Customers
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Error Notice */}
        {apiError && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">API Connection Issue</p>
                  <p className="text-sm text-red-600">{apiError}</p>
                  <Button variant="outline" size="sm" onClick={() => fetchAllQueues(true)} className="mt-2">
                    Retry Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demo Queues Notice */}
        {activeQueues.some((q) => q.id.startsWith("demo-")) && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-blue-800">
                <QrCode className="w-5 h-5" />
                <div>
                  <p className="font-medium">Demo Queues Available</p>
                  <p className="text-sm text-blue-600">
                    Try the demo queues below or create your own. Demo queue IDs: demo-queue-123, demo-queue-456
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Queue Creation Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <span>Create New Queue</span>
            </CardTitle>
            <CardDescription>Set up a new digital queue for your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="queueName" className="sr-only">
                  Queue Name
                </Label>
                <Input
                  id="queueName"
                  placeholder="Enter queue name (e.g., 'Customer Service', 'Appointments')"
                  value={queueName}
                  onChange={(e) => setQueueName(e.target.value)}
                  className="h-12"
                  onKeyPress={(e) => e.key === "Enter" && createQueue()}
                />
              </div>
              <Button
                onClick={createQueue}
                disabled={isCreating || !queueName.trim()}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Queue
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Queues */}
        {activeQueues.length === 0 ? (
          <Card className="text-center py-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Queues</h3>
              <p className="text-gray-500">Create your first queue to get started with digital queue management.</p>
              {apiError && (
                <p className="text-sm text-red-500 mt-2">
                  There may be an API connection issue. Check the error above.
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            {activeQueues.map((queue) => {
              const waitingCustomers = getWaitingCustomers(queue.customers)
              const servedCustomers = getServedCustomers(queue.customers)

              return (
                <Card key={queue.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl flex items-center space-x-2">
                          <span>{queue.name}</span>
                          {queue.id.startsWith("demo-") && (
                            <Badge variant="outline" className="text-xs">
                              DEMO
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Queue ID: {queue.id} • Created {new Date(queue.createdAt).toLocaleDateString()} at{" "}
                          {new Date(queue.createdAt).toLocaleTimeString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyQueueLink(queue.id)}
                          className="flex items-center space-x-1"
                        >
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy Link</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/queue/${queue.id}`, "_blank")}
                          className="flex items-center space-x-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteQueue(queue.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* QR Code Section */}
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/3">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <QrCode className="w-4 h-4 mr-2 text-blue-600" />
                          Customer QR Code
                        </h4>
                        <QRCodeDisplay queueId={queue.id} />
                      </div>

                      {/* Queue Stats */}
                      <div className="lg:w-2/3">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-600" />
                          Queue Statistics
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{waitingCustomers.length}</div>
                            <div className="text-sm text-blue-700">Waiting</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{servedCustomers.length}</div>
                            <div className="text-sm text-green-700">Served</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">{queue.customers.length}</div>
                            <div className="text-sm text-gray-700">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Customer List */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        Customer Queue ({queue.customers.length})
                      </h4>

                      {queue.customers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No customers in queue yet</p>
                          <p className="text-sm mt-2">
                            Share the QR code or link:{" "}
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">/queue/{queue.id}</code>
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {queue.customers.map((customer) => (
                            <div
                              key={customer.id}
                              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                                customer.status === "served"
                                  ? "bg-green-50 border-green-200"
                                  : "bg-white border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    customer.status === "served"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {customer.position}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{customer.name}</div>
                                  <div className="text-sm text-gray-500">
                                    Joined {new Date(customer.joinedAt).toLocaleTimeString()}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={customer.status === "served" ? "default" : "secondary"}
                                  className={customer.status === "served" ? "bg-green-100 text-green-800" : ""}
                                >
                                  {customer.status === "served" ? (
                                    <>
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Served
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3 h-3 mr-1" />
                                      Waiting
                                    </>
                                  )}
                                </Badge>

                                <div className="flex space-x-1">
                                  {customer.status === "waiting" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => markAsServed(queue.id, customer.id)}
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <UserCheck className="w-4 h-4" />
                                      <span className="sr-only">Mark as served</span>
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeCustomer(queue.id, customer.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="w-4 h-4" />
                                    <span className="sr-only">Remove customer</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
