export default function ChatPage() {
    return (
        <div className="text-center bg-white rounded-xL border p-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Soru-Cevap Sayfası</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Bu sayfa, kiracıların sıkça sorduğu sorulara ve cevaplarına erişebileceği bir alan sağlar. Kira sözleşmesi, bakım talepleri, ödeme süreçleri gibi konularda bilgi bulabilirsiniz.
                </p>
            </div>

            <br />

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Sıkça Sorulan Sorular</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Henüz sıkça sorulan sorular bulunmamaktadır. Yakında eklenecektir!
                </p>    
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Soru Gönder</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Belirli bir sorunuz varsa, lütfen yönetici ile iletişime geçin.
                </p>    
            </div>
        </div>
    )
}