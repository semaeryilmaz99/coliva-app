// Socket.io client — sunucuyla realtime bağlantı kurmak için.
// Kullanıcı mesaj gönderince sayfa yenilenmeden anlık iletilmesini sağlar.
import { io, Socket } from "socket.io-client"

// Prisma'daki gibi singleton pattern.
// Her component socket oluşturmasın, hep aynı bağlantıyı kullansın.
let socket: Socket | null = null

// Socket instance'ını döndürür, yoksa oluşturur.
// autoConnect: false — bağlantıyı hemen başlatma,
// kullanıcı login olunca manuel başlatacağız.
export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      autoConnect: false,
    })
  }
  return socket
}

// Kullanıcı login olduktan sonra çağrılır.
// Token'ı auth bilgisi olarak ekler — sunucu "bu kim?" diye sorarsa cevap verebiliriz.
export function connectSocket(token: string): void {
  const s = getSocket()
  s.auth = { token }
  s.connect()
}

// Kullanıcı logout olunca çağrılır.
// Bağlantıyı kapatır ve socket'i null'a çeker — bir sonraki login'de temiz başlar.
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}