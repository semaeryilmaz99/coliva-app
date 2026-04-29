export default function AnnouncementsPage() {
    return (
        <div className="text-center bg-white rounded-xL border p-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Duyurular</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Tüm duyurularınızı buradan takip edebilirsiniz. Yeni duyurular yayınlandığında burada listelenecektir.
                </p>
            </div>  

            <br />

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Yeni Duyurular</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Henüz yeni duyurunuz bulunmamaktadır. Tüm duyurularınız yayınlandığında burada listelenecektir.
                </p>    
            </div>
        </div>
    );
}   