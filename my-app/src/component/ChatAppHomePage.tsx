import { ReactNode, useEffect, useState } from "react";
import Room from "./Room";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { authenticateUser, loginUser } from "../service/AuthService";
import { connectToRoom, sendMessage } from "../service/WebSocketService";
import Message from "./Message";


interface Message {
  Payload: string
	DestinationRoom: string
	SenderName : string
}

const ChatAppHomePage: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;
  const username = location.state?.username;
  const navigate = useNavigate();
  let [connection, setCurrentConnection] = useState<WebSocket>(); 
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [rooms,setRooms] = useState<ReactNode[]>([]);
  const [currentRoom, setCurrentRoom] = useState("Global");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    authenticateUser(token).catch(()=> navigate("/register"));
    if (username !== undefined) {
      setCurrentConnection(connectToRoom(username));
    }
  }, []);

  useEffect(()=> {
    if (connection) {
      setMessages([])
      connection.addEventListener("message",  e  => {
      const message = JSON.parse(e.data);
      if (message.SenderName === undefined) {
          setConnectedUsers(message);
      }
      else {
        // @ts-ignore
        setMessages(messages => [...messages, message] )
      }
      return
    })
    }
  }, [connection]);

  useEffect(() => {
    if (connection && connectedUsers.length !== undefined) {
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
        <div className="interaction-container">
          <div className="messages-container">
            {messages.map(message => <Message sender={message.SenderName} content={message.Payload} username={username}/>)}
          </div>
          <div className="user-input-container">
            <input className='message-input-bar' type="text" placeholder="Write your message" value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const message: Message = {
                    Payload: currentMessage,
                    // @ts-ignore
                    DestinationRoom: undefined,
                    SenderName: username
                  }
                  // @ts-ignore
                  setMessages(messages => [...messages, message] )
                  sendMessage(connection, currentMessage);
                  setCurrentMessage('');
                }
              }}
            />
            <button
              className='input-button'
              onClick={() => {
                const message: Message = {
                  Payload: currentMessage,
                  // @ts-ignore
                  DestinationRoom: undefined,
                  SenderName: username
                }
                sendMessage(connection, currentMessage);
                setMessages(messages => [...messages, message]);
                setCurrentMessage('');
              }}>&#9658;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
  else {
    return (
      <div><h1>Impossible to connect to the server</h1></div>
    )
  }
  
}
 

export default ChatAppHomePage

