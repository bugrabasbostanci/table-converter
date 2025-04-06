"use client"

import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { copyToClipboard } from '@/lib/utils'
import { toast } from "@/components/ui/use-toast"

const CSVPreview = ({ tableData }) => {
  const [csvContent, setCsvContent] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!tableData || !tableData.length) return

    try {
      // CSV formatına dönüştür
      const csv = Papa.unparse(tableData, {
        quotes: true,
        delimiter: ",",
      })
      setCsvContent(csv)
    } catch (error) {
      console.error('CSV önizleme hatası:', error)
    }
  }, [tableData])

  const handleCopy = async () => {
    const success = await copyToClipboard(csvContent)
    if (success) {
      setIsCopied(true)
      toast({
        title: "Başarılı",
        description: "CSV içeriği panoya kopyalandı.",
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
        <h3 className="text-lg font-semibold">CSV Önizleme</h3>
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
        {csvContent}
      </pre>
    </div>
  )
}

export default CSVPreview 