export default function ComplaintsPage() {
    return (
        <div className="text-center bg-white rounded-xL border p-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Kira Şikayetleriniz</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Kira şikayetlerinizi buradan takip edebilirsiniz. Açık şikayetleriniz ve geçmiş şikayetleriniz listelenecektir.
                </p>
            </div>

            <br />

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Şikayet Geçmişiniz</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Henüz şikayetleriniz bulunmamaktadır.
                </p>    
            </div>  

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Açık Şikayetleriniz</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Şu anda açık bir şikayetiniz bulunmamaktadır.
                </p>    
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Şikayet Bildirimi</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Yeni bir şikayet bildirmek için lütfen yönetici ile iletişime geçin.
                </p>    
            </div>
        </div>
    )
}