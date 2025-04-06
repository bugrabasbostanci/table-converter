"use client"

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

export function UsageGuide() {
  const steps = [
    {
      title: "1. Tablo Seçimi",
      description: "Web sayfasındaki herhangi bir tablonun üzerine sağ tıklayın ve 'Seç' veya 'Select' seçeneğine tıklayın.",
      image: "/images/guide/table-select.png",
      tip: "İpucu: Tablonun tamamını seçmek için tablo başlığına tıklayabilirsiniz."
    },
    {
      title: "2. Tabloyu Kopyalama",
      description: "Seçtiğiniz tabloyu kopyalamak için Ctrl+C (Windows) veya Cmd+C (Mac) tuşlarını kullanın.",
      image: "/images/guide/table-copy.png",
      tip: "İpucu: Sağ tık menüsünden 'Kopyala' seçeneğini de kullanabilirsiniz."
    },
    {
      title: "3. Tablonun Yapıştırılması",
      description: "Table Convert'te 'Düzenle' sekmesindeki metin alanına Ctrl+V (Windows) veya Cmd+V (Mac) ile yapıştırın.",
      image: "/images/guide/table-paste.png",
      tip: "İpucu: Yapıştırdıktan sonra verilerinizi düzenleyebilirsiniz."
    },
    {
      title: "4. Format Seçimi ve Dönüştürme",
      description: "İstediğiniz çıktı formatını seçin ve 'Dönüştür ve İndir' butonuna tıklayın.",
      image: "/images/guide/table-convert.png",
      tip: "İpucu: Dönüştürmeden önce 'Önizleme' sekmesinden sonucu kontrol edebilirsiniz."
    }
  ]

  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground mb-6">
        Table Convert ile web sayfalarındaki tabloları kolayca dönüştürebilirsiniz. 
        İşte adım adım nasıl kullanacağınız:
      </p>

      {steps.map((step, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{step.tip}</p>
              </div>
              <div className="relative aspect-video">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover rounded-lg border"
                  priority
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Desteklenen Formatlar</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside">
          <li>Excel (.xlsx)</li>
          <li>CSV (.csv)</li>
          <li>PDF (.pdf)</li>
          <li>JSON (.json)</li>
          <li>Markdown (.md)</li>
        </ul>
      </div>
    </div>
  )
} 