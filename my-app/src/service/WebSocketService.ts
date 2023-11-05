export function connectToRoom(roomName? : string) : WebSocket {
    if (typeof roomName !== 'undefined') {
        return new WebSocket(`ws://localhost:8090/ws/${roomName}`)
    }
    else {
        return new WebSocket("ws://localhost:8090/ws")
    }
}