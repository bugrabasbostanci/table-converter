"use client"

import { useEffect, useRef } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Font tanımlamaları
const FONT_REGULAR = "Roboto"
const FONT_BOLD = "Roboto-Bold"

const PDFPreview = ({ tableData }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!tableData || !tableData.length) return

    const generatePDFPreview = async () => {
      try {
        // PDF oluştur
        const doc = new jsPDF('p', 'pt', 'a4')
        
        // Fontları yükle
        doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal")
        doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto-Bold", "normal")
        
        // Font ayarları
        doc.setFont(FONT_REGULAR)
        doc.setFontSize(16)
        doc.text("Önizleme", 40, 40)

        // Tablo oluştur
        doc.autoTable({
          head: [tableData[0]],
          body: tableData.slice(1),
          startY: 60,
          styles: {
            font: FONT_REGULAR,
            fontSize: 10,
            cellPadding: 6,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            overflow: 'linebreak',
            cellWidth: 'wrap'
          },
          headStyles: {
            font: FONT_BOLD,
            fillColor: [51, 51, 51],
            textColor: 255,
            fontSize: 10,
            halign: 'center'
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          margin: { top: 60, right: 30, bottom: 30, left: 30 },
          columnStyles: {
            // Her sütun için otomatik genişlik
            ...Object.fromEntries(
              tableData[0].map((_, index) => [index, { cellWidth: 'auto' }])
            )
          },
          // Sayfa sonuna gelindiğinde yeni sayfa oluştur
          showFoot: 'everyPage',
          // Tablo başlığını her sayfada göster
          showHead: 'everyPage',
          // PDF meta bilgilerini ayarla
          didDrawPage: (data) => {
            // Sayfa numarası ekle
            const pageCount = doc.internal.getNumberOfPages()
            doc.setFontSize(8)
            doc.setFont(FONT_REGULAR)
            doc.text(
              `Sayfa ${data.pageNumber} / ${pageCount}`,
              data.settings.margin.left,
              doc.internal.pageSize.getHeight() - 10
            )
            
            // Oluşturulma tarihi ekle
            const date = new Date().toLocaleDateString('tr-TR')
            doc.text(
              `Oluşturulma Tarihi: ${date}`,
              doc.internal.pageSize.getWidth() - data.settings.margin.right,
              doc.internal.pageSize.getHeight() - 10,
              { align: 'right' }
            )
          }
        })

        // PDF'i base64'e çevir
        const pdfData = doc.output('datauristring')
        
        // iframe oluştur ve PDF'i göster
        const container = canvasRef.current
        if (container) {
          container.innerHTML = `
            <iframe 
              src="${pdfData}" 
              width="100%" 
              height="600px" 
              style="border: 1px solid #ccc; border-radius: 4px;"
            ></iframe>
          `
        }
      } catch (error) {
        console.error('PDF önizleme hatası:', error)
      }
    }

    generatePDFPreview()
  }, [tableData])

  return (
    <div className="w-full">
      <div ref={canvasRef} className="pdf-preview"></div>
    </div>
  )
}

export default PDFPreview 