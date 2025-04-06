"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy } from "lucide-react"

export const XLSXPreview = ({ tableData }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSheetsExport = () => {
    toast({
      title: "Çok Yakında",
      description: "Google Sheets entegrasyonu yakında eklenecektir.",
    })
  }

  const handleCopy = async () => {
    try {
      const text = tableData.map(row => row.join('\t')).join('\n')
      await navigator.clipboard.writeText(text)
      toast({
        title: "Başarılı",
        description: "Tablo kopyalandı!",
      })
    } catch (error) {
      console.error('Kopyalama hatası:', error)
      toast({
        title: "Hata",
        description: "Tablo kopyalanırken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Excel Önizleme</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Kopyala
          </Button>
          <Button
            onClick={handleGoogleSheetsExport}
            variant="outline"
            className="flex items-center gap-2"
          >
            Google Sheets'e Aktar
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableData[0].map((cell, index) => (
                <TableHead key={index}>{cell}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Excel benzeri alt bilgi */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-2">
        <div className="flex items-center gap-4">
          <span>Sheet1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>100%</span>
          <span>|</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  )
} 