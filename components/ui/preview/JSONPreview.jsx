"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { copyToClipboard } from '@/lib/utils'
import { toast } from "@/components/ui/use-toast"

const JSONPreview = ({ tableData }) => {
  const [jsonContent, setJsonContent] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!tableData || !tableData.length) return

    try {
      // Başlık satırını al
      const headers = tableData[0]
      
      // Başlıkları düzgün formata çevir
      const formattedHeaders = headers.map(header => 
        header.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
      )
      
      // Veri satırlarını işle
      const jsonData = tableData.slice(1).map((row) => {
        const obj = {}
        formattedHeaders.forEach((header, index) => {
          const value = row[index]
          obj[header] = value === undefined || value === '' 
            ? null 
            : !isNaN(value) && value.trim() !== '' 
              ? Number(value)
              : value
        })
        return obj
      })

      // Meta bilgileri ekle
      const jsonOutput = {
        metadata: {
          totalRows: tableData.length - 1,
          totalColumns: headers.length,
          generatedAt: new Date().toISOString(),
          columns: formattedHeaders.map((header, index) => ({
            name: header,
            originalName: headers[index]
          }))
        },
        data: jsonData
      }

      // JSON stringini formatla
      setJsonContent(JSON.stringify(jsonOutput, null, 2))
    } catch (error) {
      console.error('JSON önizleme hatası:', error)
    }
  }, [tableData])

  const handleCopy = async () => {
    const success = await copyToClipboard(jsonContent)
    if (success) {
      setIsCopied(true)
      toast({
        title: "Başarılı",
        description: "JSON içeriği panoya kopyalandı.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    } else {
      toast({
        title: "Hata",
        description: "Kopyalama işlemi başarısız oldu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">JSON Önizleme</h3>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              Kopyalandı
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Kopyala
            </>
          )}
        </Button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm">
        {jsonContent}
      </pre>
    </div>
  )
}

export default JSONPreview 