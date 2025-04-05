"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, ChevronDown } from "lucide-react"
import { formatDescriptions, formatCategories } from "@/lib/constants"

export function FormatSelector({ selectedFormat, onFormatChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          data-testid="format-selector-trigger"
          className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:opacity-90 active:opacity-80 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between"
        >
          <span className="flex items-center">
            <Table data-testid="table-icon" className="w-4 h-4 mr-2" />
            {selectedFormat.toUpperCase()}
          </span>
          <ChevronDown data-testid="chevron-icon" className="w-4 h-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(formatCategories).map(([category, formats], index) => (
          <div key={category}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{category}</DropdownMenuLabel>
            {formats.map((format) => (
              <DropdownMenuItem
                key={format}
                onSelect={() => onFormatChange(format)}
              >
                <div>
                  <div>{format.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground">{formatDescriptions[format]}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 