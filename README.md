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
- Modern ve erişilebilir kullanıcı arayüzü

## Teknolojiler

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI kütüphanesi
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Yeniden kullanılabilir bileşenler
- [XLSX](https://www.npmjs.com/package/xlsx) - Excel dosyası işleme
- [jsPDF](https://www.npmjs.com/package/jspdf) - PDF oluşturma
- [Papa Parse](https://www.npmjs.com/package/papaparse) - CSV işleme

## Geliştirme

### Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/bugrabasbostanci/table-converter.git
cd table-converter
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
