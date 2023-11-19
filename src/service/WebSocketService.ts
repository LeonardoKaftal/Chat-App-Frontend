export function connectToRoom(username :string, roomName : string) : WebSocket {
    if (roomName !== 'Global') {
        return new WebSocket(`wss://websocket-chat-server-3a8b.onrender.com/ws/${username}/${roomName}`)
    }
    else {
        return new WebSocket(`wss://websocket-chat-server-3a8b.onrender.com/ws/${username}`)
    }
}

export function sendMessage(connection : WebSocket | undefined, message : string) {
    if (connection) {
        connection.send(message);
    }
}
