# Excel Dönüştürücü

Excel ve diğer tablo formatları arasında dönüşüm yapmanızı sağlayan basit ve kullanışlı bir web uygulaması.

## Özellikler

- Excel (XLSX) dosyalarını farklı formatlara dönüştürme
- Desteklenen formatlar:
  - XLSX (Microsoft Excel)
  - CSV (Virgülle Ayrılmış Değerler)
  - PDF (Taşınabilir Belge Formatı)
  - JSON (JavaScript Object Notation)
  - Markdown (Tablo Formatı)
- Sürükle-bırak dosya yükleme
- Önizleme özelliği
- Mobil uyumlu tasarım

## Teknolojiler

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [XLSX](https://www.npmjs.com/package/xlsx)
- [jsPDF](https://www.npmjs.com/package/jspdf)
- [Papa Parse](https://www.npmjs.com/package/papaparse)

## Geliştirme

### Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/excel-converter-app.git
cd excel-converter-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Test

Testleri çalıştırmak için:
```bash
npm test
# veya
yarn test
```

## Dağıtım

Bu proje [Vercel](https://vercel.com) üzerinde barındırılmaktadır. Ana dal (main branch) üzerindeki her değişiklik otomatik olarak dağıtılır.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
