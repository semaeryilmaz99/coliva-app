export default function ComplaintsLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Şikayetler Sayfası Yükleniyor...</p>
            </div>
        </div>
    );
}