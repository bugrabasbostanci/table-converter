import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Font tanımlamaları
const FONT_REGULAR = "Roboto"
const FONT_BOLD = "Roboto-Bold"

export const convertToFormat = (text, format) => {
  // Parse the table data
  const rows = text.trim().split("\n")
  const tableData = rows.map((row) => {
    return row.trim().split(/\s{2,}|\t/)
  })

  // Convert to the selected format
  switch (format) {
    case "xlsx":
      try {
        // Create a new workbook
        const wb = XLSX.utils.book_new()
        
        // Convert array to worksheet
        const ws = XLSX.utils.aoa_to_sheet(tableData)
        
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sayfa1")
        
        // Generate XLSX file buffer
        const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
        
        // Return the buffer for downloading
        return new Uint8Array(excelBuffer)
      } catch (error) {
        console.error("XLSX dönüşüm hatası:", error)
        throw new Error("XLSX dönüşümü başarısız oldu")
      }

    case "csv":
      try {
        // Papa Parse ile CSV formatına dönüştür
        const csv = Papa.unparse(tableData, {
          quotes: true, // Tüm alanları tırnak içine al
          quoteChar: '"', // Tırnak karakteri
          escapeChar: '"', // Kaçış karakteri
          delimiter: ",", // Ayraç karakteri
          header: false, // Başlık satırı yok
          newline: "\n", // Yeni satır karakteri
          skipEmptyLines: false, // Boş satırları atla
          columns: null // Otomatik kolon tespiti
        })
        return csv
      } catch (error) {
        console.error("CSV dönüşüm hatası:", error)
        throw new Error("CSV dönüşümü başarısız oldu")
      }

    case "pdf":
      try {
        // Yeni bir PDF dökümanı oluştur (A4 boyutu)
        const doc = new jsPDF('p', 'pt', 'a4')
        
        // Fontları yükle
        doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal")
        doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto-Bold", "normal")
        
        // Font ayarları
        doc.setFont(FONT_REGULAR)
        
        // Başlık ekle
        doc.setFontSize(16)
        doc.setFont(FONT_BOLD)
        const title = "Dönüştürülmüş Tablo"
        const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize()
        const pageWidth = doc.internal.pageSize.getWidth()
        const titleX = (pageWidth - titleWidth) / 2
        doc.text(title, titleX, 40)
        
        // Tablo verilerini hazırla
        const processedTableData = {
          head: [tableData[0]],
          body: tableData.slice(1).map(row => 
            row.map(cell => String(cell))
          )
        }
        
        // Tablo ayarlarını yapılandır
        doc.autoTable({
          ...processedTableData,
          startY: 60,
          theme: 'grid',
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
        
        // PDF'i buffer olarak döndür
        const pdfBuffer = doc.output('arraybuffer')
        return new Uint8Array(pdfBuffer)
      } catch (error) {
        console.error("PDF dönüşüm hatası:", error)
        throw new Error("PDF dönüşümü başarısız oldu")
      }

    case "json":
      try {
        // Başlık satırını al
        const headers = tableData[0] || []
        
        // Başlıkları düzgün formata çevir (boşlukları alt çizgi ile değiştir ve küçük harfe çevir)
        const formattedHeaders = headers.map(header => 
          header.toLowerCase()
        )
        
        // Veri satırlarını işle
        const jsonData = tableData.slice(1).map((row) => {
          const obj = {}
          formattedHeaders.forEach((header, index) => {
            // Boş değerleri null olarak ayarla
            const value = row[index]
            // Sayısal değerleri number tipine çevir
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

        // JSON stringini formatla (2 space indent)
        return JSON.stringify(jsonOutput, null, 2)
      } catch (error) {
        console.error("JSON dönüşüm hatası:", error)
        throw new Error("JSON dönüşümü başarısız oldu")
      }

    case "markdown":
      try {
        // Başlık ekle
        let markdown = "# Dönüştürülmüş Tablo\n\n"
        
        // Tablo başlığını ekle
        markdown += "| " + tableData[0].join(" | ") + " |\n"
        
        // Ayırıcı satırı ekle
        markdown += "| " + tableData[0].map(() => "---").join(" | ") + " |\n"
        
        // Veri satırlarını ekle
        tableData.slice(1).forEach(row => {
          markdown += "| " + row.join(" | ") + " |\n"
        })
        
        return markdown
      } catch (error) {
        console.error("Markdown dönüşüm hatası:", error)
        throw new Error("Markdown dönüşümü başarısız oldu")
      }

    default:
      // Geçersiz format durumunda orijinal metni döndür
      return text
  }
}

export const getMimeType = (format) => {
  switch (format) {
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    case "csv":
      return "text/csv"
    case "pdf":
      return "application/pdf"
    case "json":
      return "application/json"
    case "markdown":
      return "text/markdown"
    default:
      return "text/plain"
  }
} 