export function connectToRoom(username :string, roomName? : string) : WebSocket {
    if (typeof roomName !== 'undefined') {
        return new WebSocket(`ws://localhost:8090/ws/${username}/${roomName}`)
    }
    else {
        return new WebSocket(`ws://localhost:8090/ws/${username}`)
    }
}

export function sendMessage(connection : WebSocket | undefined, message : string) {
    if (connection) {
        connection.send(message);
    }
}
