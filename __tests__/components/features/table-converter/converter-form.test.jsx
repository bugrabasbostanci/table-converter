import { render, screen, fireEvent } from '@testing-library/react'
import { ConverterForm } from '@/components/features/table-converter/converter-form'
import { toast } from '@/components/ui/use-toast'

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}))

describe('ConverterForm', () => {
  const mockOnTextChange = jest.fn()
  
  beforeEach(() => {
    mockOnTextChange.mockClear()
    toast.mockClear()
  })

  test('textarea boş olduğunda temizle butonu görünmemeli', () => {
    render(<ConverterForm inputText="" onTextChange={mockOnTextChange} />)
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('textarea dolu olduğunda temizle butonu görünmeli', () => {
    render(<ConverterForm inputText="test" onTextChange={mockOnTextChange} />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('temizle butonuna tıklandığında onTextChange boş string ile çağrılmalı', () => {
    render(<ConverterForm inputText="test" onTextChange={mockOnTextChange} />)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(mockOnTextChange).toHaveBeenCalledWith("")
    expect(toast).toHaveBeenCalledWith({
      title: "Tablo temizlendi",
      description: "Yapıştırılan veriler başarıyla temizlendi.",
    })
  })

  test('textarea değiştiğinde onTextChange yeni değerle çağrılmalı', () => {
    render(<ConverterForm inputText="" onTextChange={mockOnTextChange} />)
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'yeni değer' }
    })
    
    expect(mockOnTextChange).toHaveBeenCalledWith("yeni değer")
  })

  test('placeholder text doğru olmalı', () => {
    render(<ConverterForm inputText="" onTextChange={mockOnTextChange} />)
    
    expect(screen.getByPlaceholderText('Tabloyu buraya yapıştırın...')).toBeInTheDocument()
  })

  test('textarea font-mono class\'ına sahip olmalı', () => {
    render(<ConverterForm inputText="" onTextChange={mockOnTextChange} />)
    
    expect(screen.getByRole('textbox')).toHaveClass('font-mono')
  })
}) 