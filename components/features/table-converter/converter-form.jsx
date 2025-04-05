"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function ConverterForm({ inputText, onTextChange }) {
  const handleClear = () => {
    onTextChange("")
    toast({
      title: "Tablo temizlendi",
      description: "Yapıştırılan veriler başarıyla temizlendi.",
    })
  }

  return (
    <div className="relative">
      <Textarea
        placeholder="Tabloyu buraya yapıştırın..."
        value={inputText}
        onChange={(e) => onTextChange(e.target.value)}
        className="min-h-[300px] font-mono"
      />
      {inputText.trim() && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleClear}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 