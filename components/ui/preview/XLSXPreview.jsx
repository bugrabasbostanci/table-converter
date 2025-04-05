"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Sheet } from "lucide-react"

export const XLSXPreview = ({ tableData }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSheetsExport = () => {
    toast({
      title: "Çok Yakında",
      description: "Google Sheets entegrasyonu yakında eklenecektir.",
    })
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Excel Önizleme</h3>
        <Button
          onClick={handleGoogleSheetsExport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Sheet className="w-4 h-4" />
          Google Sheets'e Aktar
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Excel benzeri başlık */}
          <thead className="bg-[#E8E8E8]">
            <tr>
              {/* Excel sütun başlıkları (A, B, C...) */}
              <th className="w-10 px-3 py-2 text-left text-xs font-medium text-gray-500 border-r border-gray-300"></th>
              {tableData[0]?.map((_, index) => (
                <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-r border-gray-300">
                  {String.fromCharCode(65 + index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Başlık satırı */}
            <tr className="bg-[#F8F9FA]">
              <td className="px-3 py-2 text-xs text-gray-500 border-r border-gray-300">1</td>
              {tableData[0]?.map((header, index) => (
                <td key={index} className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                  {header}
                </td>
              ))}
            </tr>
            {/* Veri satırları */}
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-xs text-gray-500 border-r border-gray-300">{rowIndex + 2}</td>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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