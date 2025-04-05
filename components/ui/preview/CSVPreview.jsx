"use client"

import { useEffect, useState } from 'react'
import Papa from 'papaparse'

const CSVPreview = ({ tableData }) => {
  const [csvContent, setCsvContent] = useState('')

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

  return (
    <div className="w-full">
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm">
        {csvContent}
      </pre>
    </div>
  )
}

export default CSVPreview 