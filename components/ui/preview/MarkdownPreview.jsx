"use client"

import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { copyToClipboard } from '@/lib/utils'
import { toast } from "@/components/ui/use-toast"

const MarkdownPreview = ({ tableData }) => {
  const [mdContent, setMdContent] = useState('')
  const [htmlContent, setHtmlContent] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!tableData || !tableData.length) return

    try {
      let content = ""

      // Başlık ekle
      content += "# Dönüştürülmüş Tablo\n\n"

      // Tablo başlangıcı
      if (tableData.length > 0) {
        // Başlık satırı
        content += "| " + tableData[0].map(header => 
          header.replace(/\|/g, "\\|").replace(/-/g, "\\-")
        ).join(" | ") + " |\n"

        // Ayırıcı satır - sola hizalı
        content += "| " + tableData[0].map(() => "---").join(" | ") + " |\n"

        // Veri satırları - sayısal değerleri sağa hizala
        tableData.slice(1).forEach(row => {
          content += "| " + row.map((cell, index) => {
            if (!cell || cell.trim() === "") return " "
            // Sayısal değerleri kontrol et ve sağa hizala
            const isNumeric = !isNaN(cell.toString().replace(',', '.'))
            return cell
              .toString()
              .replace(/\|/g, "\\|")
              .replace(/\n/g, "<br>")
              .replace(/-/g, "\\-")
          }).join(" | ") + " |\n"
        })
      }

      // Markdown içeriğini ayarla
      setMdContent(content)

      // HTML önizleme için dönüştür ve stil ekle
      const customStyles = `
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid #dee2e6;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
          }
          tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          tr:hover {
            background-color: #f2f2f2;
          }
          h1 {
            color: #333;
            font-size: 1.8em;
            margin-bottom: 1em;
            font-weight: 600;
          }
        </style>
      `
      const html = customStyles + marked(content)
      setHtmlContent(html)
    } catch (error) {
      console.error('Markdown önizleme hatası:', error)
    }
  }, [tableData])

  const handleCopy = async () => {
    const success = await copyToClipboard(mdContent)
    if (success) {
      setIsCopied(true)
      toast({
        title: "Başarılı",
        description: "Markdown içeriği panoya kopyalandı.",
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
        <h3 className="text-lg font-semibold">Markdown Önizleme</h3>
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
      <div className="w-full grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="markdown-source">
          <div className="text-sm font-medium mb-3 text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Markdown Kaynak
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm border border-gray-200 h-[600px]">
            {mdContent}
          </pre>
        </div>
        <div className="markdown-preview">
          <div className="text-sm font-medium mb-3 text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            HTML Önizleme
          </div>
          <div 
            className="prose max-w-none bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto h-[600px]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  )
}

export default MarkdownPreview 