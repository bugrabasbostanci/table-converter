"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, Edit } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Logo from '@/components/ui/logo'
import { ConverterForm } from '@/components/features/table-converter/converter-form'
import { FormatSelector } from '@/components/features/table-converter/format-selector'
import { convertToFormat, getMimeType } from '@/lib/converters'
import PDFPreview from '@/components/ui/preview/PDFPreview'
import CSVPreview from '@/components/ui/preview/CSVPreview'
import JSONPreview from '@/components/ui/preview/JSONPreview'
import MarkdownPreview from '@/components/ui/preview/MarkdownPreview'
import { XLSXPreview } from '@/components/ui/preview/XLSXPreview'

export default function Page() {
  const [inputText, setInputText] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("xlsx")
  const [activeTab, setActiveTab] = useState("edit")
  const [isConverting, setIsConverting] = useState(false)
  const [tablePreview, setTablePreview] = useState([])
  const [showTabHint, setShowTabHint] = useState(false)

  // Parse table data when input changes
  const handleTextChange = (text) => {
    setInputText(text)
    if (text.trim()) {
      const rows = text.trim().split("\n")
      const tableData = rows.map((row) => row.trim().split(/\s{2,}|\t/))
      setTablePreview(tableData)
      setShowTabHint(true)
    } else {
      setTablePreview([])
      setShowTabHint(false)
    }
  }

  // Handle format conversion and download
  const handleConvertAndDownload = async () => {
    try {
      setIsConverting(true)

      // Convert the data
      const result = convertToFormat(inputText, selectedFormat)

      // Create blob and download
      const blob = new Blob([result], { type: getMimeType(selectedFormat) })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tablo.${selectedFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Dönüştürme başarılı",
        description: "Dosyanız indiriliyor...",
      })
    } catch (error) {
      console.error("Dönüştürme hatası:", error)
      toast({
        title: "Hata",
        description: error.message || "Dönüştürme işlemi başarısız oldu.",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Logo className="w-12 h-12" />
            <div>
              <CardTitle>Tablo Dönüştürücü</CardTitle>
              <CardDescription>
                Tabloyu yapıştırın, formatı seçin ve dönüştürün.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="edit" className="relative">
                  <Edit className="w-4 h-4 mr-2" />
                  Düzenle
                  {showTabHint && (
                    <div className="absolute -top-2 -right-2">
                      <div className="animate-bounce bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        !
                      </div>
                    </div>
                  )}
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="w-4 h-4 mr-2" />
                  Önizleme
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <FormatSelector
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                />

                <Button 
                  onClick={handleConvertAndDownload} 
                  disabled={!inputText.trim() || isConverting}
                >
                  {isConverting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Dönüştürülüyor
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Dönüştür ve İndir
                    </>
                  )}
                </Button>
              </div>
            </div>

            <TabsContent value="edit" className="m-0">
              <ConverterForm
                inputText={inputText}
                onTextChange={handleTextChange}
              />
            </TabsContent>

            <TabsContent value="preview" className="m-0">
              {inputText.trim() ? (
                <div className="mt-4">
                  {selectedFormat === "pdf" && <PDFPreview tableData={tablePreview} />}
                  {selectedFormat === "csv" && <CSVPreview tableData={tablePreview} />}
                  {selectedFormat === "json" && <JSONPreview tableData={tablePreview} />}
                  {selectedFormat === "markdown" && <MarkdownPreview tableData={tablePreview} />}
                  {selectedFormat === "xlsx" && <XLSXPreview tableData={tablePreview} />}
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Önizleme için lütfen bir tablo yapıştırın.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  )
}

