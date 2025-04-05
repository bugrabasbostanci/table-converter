"use client"

import PDFPreview from './PDFPreview'
import CSVPreview from './CSVPreview'
import JSONPreview from './JSONPreview'
import MarkdownPreview from './MarkdownPreview'

const PreviewComponent = ({ format, tableData }) => {
  // Format'a göre uygun komponenti seç
  const renderPreview = () => {
    switch (format) {
      case 'pdf':
        return <PDFPreview tableData={tableData} />
      case 'csv':
        return <CSVPreview tableData={tableData} />
      case 'json':
        return <JSONPreview tableData={tableData} />
      case 'markdown':
        return <MarkdownPreview tableData={tableData} />
      default:
        return (
          <div className="text-center p-4 text-gray-500">
            Bu format için önizleme kullanılamıyor.
          </div>
        )
    }
  }

  return (
    <div className="preview-container w-full">
      {renderPreview()}
    </div>
  )
}

export default PreviewComponent 