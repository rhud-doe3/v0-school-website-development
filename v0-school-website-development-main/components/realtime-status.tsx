'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

interface RealtimeStatusProps {
  connected: boolean
  lastUpdate?: Date
}

export function RealtimeStatus({ connected, lastUpdate }: RealtimeStatusProps) {
  const [displayTime, setDisplayTime] = useState<string>('')

  useEffect(() => {
    if (!lastUpdate) return

    const updateDisplayTime = () => {
      const now = new Date()
      const diff = now.getTime() - lastUpdate.getTime()
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)

      if (seconds < 60) {
        setDisplayTime('just now')
      } else if (minutes < 60) {
        setDisplayTime(`${minutes}m ago`)
      } else {
        setDisplayTime(lastUpdate.toLocaleTimeString())
      }
    }

    updateDisplayTime()
    const interval = setInterval(updateDisplayTime, 10000)

    return () => clearInterval(interval)
  }, [lastUpdate])

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-accent/50 rounded-lg text-sm">
      {connected ? (
        <>
          <Wifi className="w-4 h-4 text-green-600" />
          <span className="text-green-700">Real-time Connected</span>
          {lastUpdate && (
            <span className="text-muted-foreground">• Updated {displayTime}</span>
          )}
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-orange-600 animate-pulse" />
          <span className="text-orange-700">Connecting...</span>
        </>
      )}
    </div>
  )
}
