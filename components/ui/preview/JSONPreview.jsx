"use client"

import { useEffect, useState } from 'react'

const JSONPreview = ({ tableData }) => {
  const [jsonContent, setJsonContent] = useState('')

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

  return (
    <div className="w-full">
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm">
        {jsonContent}
      </pre>
    </div>
  )
}

export default JSONPreview 