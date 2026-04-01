export default function CommunityPage() {
    return (
        <div className="text-center bg-white rounded-xL border p-5">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Topluluk Sayfası</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Bu sayfa, kiracıların birbirleriyle iletişim kurabileceği, deneyimlerini paylaşabileceği ve sorularını sorabileceği bir topluluk alanıdır.
                </p>
            </div>

            <br />

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Topluluk Forumları</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Henüz aktif bir topluluk forumu bulunmamaktadır. Yakında açılacaktır!
                </p>    
            </div>  

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Soru-Cevap Bölümü</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Kiracıların sıkça sorduğu sorular ve cevapları burada listelenecektir.
                </p>    
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900">Deneyim Paylaşımları</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Kiracıların deneyimlerini paylaşabileceği bir alan. Yakında açılacaktır!
                </p>    
            </div>
        </div>
    )
}