export default function NotFound() {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600">Sayfa bulunamadı</p>
      </div>
    );
  }
  
  // ÖNEMLİ: Static export için bu ayar
  export const dynamicParams = false;