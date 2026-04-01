"use client";

export default function ChatError({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Bir şeyler yanlış gitti...
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    {error.message || "Unexpected error occurred"}
                </p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Tekrar Dene
                </button>
            </div>
        </div>
    );
}