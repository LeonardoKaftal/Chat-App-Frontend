import { ReactNode, useEffect, useState } from "react";
import Room from "./Room";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { authenticateUser, loginUser } from "../service/AuthService";
import { connectToRoom } from "../service/WebSocketService";


const ChatAppHomePage: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;
  const username = location.state?.username;
  const navigate = useNavigate();
  let [connection, setCurrentConnection] = useState<WebSocket>() 
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [rooms,setRooms] = useState<ReactNode[]>([])
  const [currentRoom, setCurrentRoom] = useState("Global");

  useEffect(() => {
    authenticateUser(token).catch(()=> navigate("/register"));
    if (username !== undefined) {
      setCurrentConnection(connectToRoom(username));
    }
  }, []);

  useEffect(()=> {
    if (connection) {
      connection.addEventListener("message",  e  => {
      const message = JSON.parse(e.data)
      if (typeof message !== "string") {
          setConnectedUsers(message)
      }
      return
    })
    }
    

  }, [connection])

  useEffect(() => {
    if (connection) {
      const roomElements = connectedUsers.map(currentUsername => (
      <div key={username}>
        {username !== currentUsername && currentRoom !== currentUsername &&
        <Room username={username} roomName={currentUsername} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={false} />
        } 
        {
          username !== currentUsername && currentRoom === currentUsername &&
          <Room username={username} roomName={currentUsername} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={true} />
        }
      </div>
    ));
    setRooms(roomElements);
    }
  
  }, [connectedUsers]);



  if (connection) {
    return (
    <div className="App">
      <header className="chat-app-header">
        <h1>Chat App</h1>
      </header>
      <div className="chat-container">
        <div className="room-container">
          {
            currentRoom !== "Global" &&
              <Room roomName="Global" username={username} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={false}/>
          }
          {
            currentRoom === "Global" &&
            <Room roomName="Global" username={username} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={true}/>
          }
          {rooms}
        </div>
        <div className="message-container"></div>
      </div>
    </div>
  );
  }
  else {
    return (
      <div></div>
    )
  }
  
}
 

export default ChatAppHomePage

