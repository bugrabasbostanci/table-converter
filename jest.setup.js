import '@testing-library/jest-dom'
import React from 'react'

// Mock window
global.window = {
  URL: {
    createObjectURL: jest.fn(),
    revokeObjectURL: jest.fn()
  },
  getComputedStyle: jest.fn(() => ({
    getPropertyValue: jest.fn()
  }))
}

// Mock document
global.document = {
  ...document,
  createElement: jest.fn((tagName) => {
    if (tagName === 'canvas') {
      return {
        getContext: jest.fn(() => ({
          measureText: jest.fn(() => ({ width: 100 }))
        })),
        toDataURL: jest.fn()
      }
    }
    return {}
  })
}

// Mock HTMLCanvasElement
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  measureText: jest.fn(() => ({ width: 100 }))
}))

// Mock jsPDF
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    addFont: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    getStringUnitWidth: jest.fn().mockReturnValue(10),
    getFontSize: jest.fn().mockReturnValue(16),
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(595),
        getHeight: jest.fn().mockReturnValue(842)
      },
      getNumberOfPages: jest.fn().mockReturnValue(1)
    },
    text: jest.fn(),
    autoTable: jest.fn(),
    output: jest.fn().mockReturnValue(new ArrayBuffer(8))
  }))
})

// Mock jspdf-autotable
jest.mock('jspdf-autotable', () => {})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn()
  }))
}))

// Mock @radix-ui/react-dropdown-menu
jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: jest.fn(({ children }) => <div>{children}</div>),
  Trigger: jest.fn(({ children }) => <button>{children}</button>),
  Portal: jest.fn(({ children }) => <div>{children}</div>),
  Content: jest.fn(({ children }) => <div>{children}</div>),
  Item: jest.fn(({ children, onSelect }) => (
    <div role="menuitem" onClick={onSelect}>
      {children}
    </div>
  )),
  Group: jest.fn(({ children }) => <div>{children}</div>),
  Label: jest.fn(({ children }) => <div>{children}</div>),
  Separator: jest.fn(() => <div />)
}))

// Mock XLSX
jest.mock('xlsx', () => ({
  utils: {
    book_new: jest.fn(() => ({})),
    aoa_to_sheet: jest.fn(() => ({})),
    book_append_sheet: jest.fn(),
  },
  write: jest.fn(() => new ArrayBuffer(10)),
}))