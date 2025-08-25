"use client"

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-[#2A2A2A] rounded-lg p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={`p-2 ${
          view === "grid"
            ? "bg-[#D32F2F] text-white hover:bg-[#B71C1C]"
            : "text-[#7A7A7A] hover:text-white hover:bg-[#3A3A3A]"
        }`}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={`p-2 ${
          view === "list"
            ? "bg-[#D32F2F] text-white hover:bg-[#B71C1C]"
            : "text-[#7A7A7A] hover:text-white hover:bg-[#3A3A3A]"
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
