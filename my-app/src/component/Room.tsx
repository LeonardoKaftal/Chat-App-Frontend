import React, { useState } from "react";
import { connectToRoom } from "../service/WebSocketService";

interface Props {
  username: string;
  roomName: string;
  connection: WebSocket | undefined;
  setCurrentConnection: (connection: WebSocket) => void;
  setCurrentRoom: (roomName: string) => void;
  isSelected: boolean
}

const Room: React.FC<Props> = ({ username, roomName, connection, setCurrentConnection, setCurrentRoom, isSelected }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const roomClassName = isSelected ? "room selected" : "room";

  const handleRoomClick = () => {
    if (connection) {
      connection.close();
    }

    const newRoomName = `${username}-${roomName}`;
    const newConnection = connectToRoom(username, newRoomName);

    setCurrentConnection(newConnection);
    setCurrentRoom(roomName)    

  };




  return (
    <div className={roomClassName} onClick={handleRoomClick}>
      <h1>{roomName}</h1>
    </div>
  );
};

export default Room;
