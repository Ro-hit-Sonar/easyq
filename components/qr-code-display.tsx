"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface QRCodeDisplayProps {
  queueId: string
}

export function QRCodeDisplay({ queueId }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const queueUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/queue/${queueId}`

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, queueUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1f2937",
          light: "#ffffff",
        },
      })
    }
  }, [queueUrl])

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = `queue-${queueId}-qr.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const openQueue = () => {
    window.open(queueUrl, "_blank")
  }

  return (
    <Card className="p-4 bg-white">
      <div className="text-center space-y-4">
        <canvas ref={canvasRef} className="mx-auto border rounded-lg" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600 break-all">{queueUrl}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" variant="outline" onClick={downloadQR} className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
            <Button size="sm" variant="outline" onClick={openQueue} className="flex items-center space-x-1">
              <ExternalLink className="w-4 h-4" />
              <span>Open Queue</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
