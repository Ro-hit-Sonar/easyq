"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Users,
  Clock,
  Loader2,
  Trophy,
  Bell,
  RefreshCw,
} from "lucide-react";

interface QueueCustomer {
  id: string;
  name: string;
  position: number;
  joinedAt: string;
  status: "waiting" | "served";
}

interface QueueData {
  id: string;
  name: string;
  customers: QueueCustomer[];
  isActive: boolean;
  createdAt: string;
}

export default function QueueJoinPage({
  params,
}: {
  params: { queueId: string };
}) {
  const [customerName, setCustomerName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();

  const { queueId } = params;

  // Get customer data from localStorage
  const getStoredCustomer = useCallback(() => {
    const storedData = localStorage.getItem(`queue-${queueId}-customer`);
    if (storedData) {
      try {
        return JSON.parse(storedData) as QueueCustomer;
      } catch (error) {
        console.error("Error parsing stored customer data:", error);
        localStorage.removeItem(`queue-${queueId}-customer`);
      }
    }
    return null;
  }, [queueId]);

  // Store customer data in localStorage
  const storeCustomer = useCallback(
    (customer: QueueCustomer) => {
      localStorage.setItem(
        `queue-${queueId}-customer`,
        JSON.stringify(customer)
      );
    },
    [queueId]
  );

  // Remove customer data from localStorage
  const removeStoredCustomer = useCallback(() => {
    localStorage.removeItem(`queue-${queueId}-customer`);
  }, [queueId]);

  // Fetch queue data from API
  const fetchQueueData = useCallback(async () => {
    try {
      setIsPolling(true);
      const response = await fetch(`/api/queue/${queueId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch queue data");
      }

      setQueueData(data.queue);

      // Check if stored customer is still in queue
      const storedCustomer = getStoredCustomer();
      if (storedCustomer) {
        const updatedCustomer = data.queue.customers.find(
          (c: QueueCustomer) => c.id === storedCustomer.id
        );

        if (updatedCustomer) {
          // Update stored customer data if position changed
          if (updatedCustomer.position !== storedCustomer.position) {
            storeCustomer(updatedCustomer);
            toast({
              title: "Position Update",
              description: `You are now ${getOrdinalSuffix(
                updatedCustomer.position
              )} in line.`,
            });
          }
        } else {
          // Customer not found in queue (might have been served or removed)
          removeStoredCustomer();
          toast({
            title: "Queue Update",
            description: "You have been removed from the queue.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
      toast({
        title: "Error",
        description: "Failed to update queue information.",
        variant: "destructive",
      });
    } finally {
      setIsPolling(false);
    }
  }, [queueId, getStoredCustomer, storeCustomer, removeStoredCustomer, toast]);

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        await fetchQueueData();
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fetchQueueData]);

  // Polling for real-time updates
  useEffect(() => {
    const storedCustomer = getStoredCustomer();
    if (!storedCustomer) return;

    const interval = setInterval(fetchQueueData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [getStoredCustomer, fetchQueueData]);

  const joinQueue = async () => {
    if (!customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to join the queue.",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);

    try {
      const response = await fetch(`/api/queue/${queueId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: customerName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join queue");
      }

      // Store the customer data
      storeCustomer(data.customer);

      // Refresh queue data
      await fetchQueueData();

      toast({
        title: "Successfully joined!",
        description: `You are ${getOrdinalSuffix(
          data.customer.position
        )} in line.`,
      });
    } catch (error) {
      console.error("Error joining queue:", error);
      toast({
        title: "Failed to join queue",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
  };

  const getEstimatedWaitTime = (position: number): string => {
    const avgServiceTime = 5; // minutes per customer
    const waitTime = position * avgServiceTime;

    if (waitTime < 60) {
      return `${waitTime} minutes`;
    } else {
      const hours = Math.floor(waitTime / 60);
      const minutes = waitTime % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading queue information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const storedCustomer = getStoredCustomer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {queueData?.name || "Queue"}
          </CardTitle>
          <CardDescription>
            {storedCustomer ? "Your position in the queue" : "Join the queue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {storedCustomer ? (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-2">
                  {getOrdinalSuffix(storedCustomer.position)}
                </h2>
                <p className="text-gray-600">in line</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  Estimated wait:{" "}
                  {getEstimatedWaitTime(storedCustomer.position)}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{queueData?.customers.length || 0} people in queue</span>
              </div>
              {isPolling && (
                <div className="flex items-center justify-center gap-2 text-sm text-blue-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </div>
              )}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                joinQueue();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isJoining}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isJoining || !customerName.trim()}
              >
                {isJoining ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Queue"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
