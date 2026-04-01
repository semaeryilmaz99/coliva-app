export default function PaymentsPage() {
    return (
        <div className="text-center bg-white rounded-xL border p-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Kira Ödemeleriniz</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Kira ödemelerinizi buradan takip edebilirsiniz. Son ödeme durumunuz ve geçmiş ödemeleriniz listelenecektir.
                </p>
            </div>

            <br />

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Ödeme Geçmişiniz</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Henüz ödeme geçmişiniz bulunmamaktadır.
                </p>    
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Son Ödeme Durumu</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Son ödemeniz 2024-05-01 tarihinde yapılmıştır. Bir sonraki ödemeniz 2024-06-01 tarihinde yapılacaktır.
                </p>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Kira Ödeme Takvimi</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Kira ödemeleriniz her ayın 1'inde yapılır. Lütfen ödeme tarihlerini kaçırmamaya özen gösterin.
                </p>
            </div>
        </div>



    )
}