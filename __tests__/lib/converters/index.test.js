import { convertToFormat, getMimeType } from '@/lib/converters'

describe('convertToFormat', () => {
  const sampleTable = `başlık1  başlık2  başlık3
değer1   değer2   değer3
değer4   değer5   değer6`

  test('PDF formatına dönüştürme', () => {
    const result = convertToFormat(sampleTable, 'pdf')
    expect(result).toBeInstanceOf(Uint8Array)
  })

  test('JSON formatına dönüştürme', () => {
    const result = convertToFormat(sampleTable, 'json')
    const parsed = JSON.parse(result)
    
    // Meta bilgileri kontrol et
    expect(parsed).toHaveProperty('metadata')
    expect(parsed.metadata).toHaveProperty('totalRows', 2)
    expect(parsed.metadata).toHaveProperty('totalColumns', 3)
    expect(parsed.metadata).toHaveProperty('generatedAt')
    expect(parsed.metadata).toHaveProperty('columns')
    expect(parsed.metadata.columns).toHaveLength(3)
    
    // Veri yapısını kontrol et
    expect(parsed).toHaveProperty('data')
    expect(parsed.data).toHaveLength(2)
    expect(parsed.data[0]).toEqual({
      başlık1: 'değer1',
      başlık2: 'değer2',
      başlık3: 'değer3'
    })
    expect(parsed.data[1]).toEqual({
      başlık1: 'değer4',
      başlık2: 'değer5',
      başlık3: 'değer6'
    })
  })

  test('XLSX formatına dönüştürme', () => {
    const result = convertToFormat(sampleTable, 'xlsx')
    expect(result).toBeInstanceOf(Uint8Array)
  })

  test('CSV formatına dönüştürme', () => {
    const result = convertToFormat(sampleTable, 'csv')
    const lines = result.split('\n')
    expect(lines).toHaveLength(3)
    expect(lines[0]).toBe('"başlık1","başlık2","başlık3"')
    expect(lines[1]).toBe('"değer1","değer2","değer3"')
    expect(lines[2]).toBe('"değer4","değer5","değer6"')
  })

  test('Markdown formatına dönüştürme', () => {
    const result = convertToFormat(sampleTable, 'markdown')
    const lines = result.split('\n')
    expect(lines).toContain('# Dönüştürülmüş Tablo')
    expect(lines).toContain('| başlık1 | başlık2 | başlık3 |')
    expect(lines).toContain('| --- | --- | --- |')
    expect(lines).toContain('| değer1 | değer2 | değer3 |')
    expect(lines).toContain('| değer4 | değer5 | değer6 |')
  })

  test('Boş girdi kontrolü', () => {
    const result = convertToFormat('', 'xlsx')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThan(0)
  })

  test('Geçersiz format kontrolü', () => {
    const result = convertToFormat(sampleTable, 'invalid')
    const lines = result.split('\n')
    expect(lines[0]).toBe('başlık1  başlık2  başlık3')
    expect(lines[1]).toBe('değer1   değer2   değer3')
    expect(lines[2]).toBe('değer4   değer5   değer6')
  })
})

describe('getMimeType', () => {
  test('XLSX için doğru MIME type döndürmeli', () => {
    expect(getMimeType('xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  })

  test('CSV için doğru MIME type döndürmeli', () => {
    expect(getMimeType('csv')).toBe('text/csv')
  })

  test('PDF için doğru MIME type döndürmeli', () => {
    expect(getMimeType('pdf')).toBe('application/pdf')
  })

  test('JSON için doğru MIME type döndürmeli', () => {
    expect(getMimeType('json')).toBe('application/json')
  })

  test('Markdown için doğru MIME type döndürmeli', () => {
    expect(getMimeType('markdown')).toBe('text/markdown')
  })

  test('Geçersiz format için text/plain döndürmeli', () => {
    expect(getMimeType('invalid')).toBe('text/plain')
  })
}) 