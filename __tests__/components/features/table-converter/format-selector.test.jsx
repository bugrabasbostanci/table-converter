import { render, screen, fireEvent } from '@testing-library/react'
import { FormatSelector } from '@/components/features/table-converter/format-selector'
import { formatDescriptions, formatCategories } from '@/lib/constants'

describe('FormatSelector', () => {
  const mockOnFormatChange = jest.fn()
  
  beforeEach(() => {
    mockOnFormatChange.mockClear()
  })

  test('seçili formatı göstermeli', () => {
    render(
      <FormatSelector 
        selectedFormat="xlsx" 
        onFormatChange={mockOnFormatChange} 
      />
    )
    
    const trigger = screen.getByTestId('format-selector-trigger')
    expect(trigger).toHaveTextContent('XLSX')
  })

  test('format seçildiğinde onFormatChange çağrılmalı', () => {
    render(
      <FormatSelector 
        selectedFormat="xlsx" 
        onFormatChange={mockOnFormatChange} 
      />
    )
    
    // Dropdown'ı aç
    fireEvent.click(screen.getByTestId('format-selector-trigger'))
    
    // CSV formatını seç
    const csvMenuItem = screen.getByRole('menuitem', { name: /CSV/i })
    fireEvent.click(csvMenuItem)
    
    expect(mockOnFormatChange).toHaveBeenCalledWith('csv')
  })

  test('format açıklamaları görünmeli', () => {
    render(
      <FormatSelector 
        selectedFormat="xlsx" 
        onFormatChange={mockOnFormatChange} 
      />
    )
    
    // Dropdown'ı aç
    fireEvent.click(screen.getByTestId('format-selector-trigger'))
    
    // Format açıklamalarının görünür olduğunu kontrol et
    Object.entries(formatDescriptions).forEach(([format, description]) => {
      const menuItem = screen.getByRole('menuitem', { name: new RegExp(`${format}.*${description}`, 'i') })
      expect(menuItem).toBeInTheDocument()
    })
  })

  test('format kategorileri görünmeli', () => {
    render(
      <FormatSelector 
        selectedFormat="xlsx" 
        onFormatChange={mockOnFormatChange} 
      />
    )
    
    // Dropdown'ı aç
    fireEvent.click(screen.getByTestId('format-selector-trigger'))
    
    // Kategorilerin görünür olduğunu kontrol et
    Object.keys(formatCategories).forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  test('ikonlar görünmeli', () => {
    render(
      <FormatSelector 
        selectedFormat="xlsx" 
        onFormatChange={mockOnFormatChange} 
      />
    )
    
    // Table ikonunun görünür olduğunu kontrol et
    expect(screen.getByTestId('table-icon')).toBeInTheDocument()
    
    // ChevronDown ikonunun görünür olduğunu kontrol et
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
  })
}) 