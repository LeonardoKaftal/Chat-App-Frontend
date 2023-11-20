import { ReactNode, useEffect, useState } from "react";
import Room from "./Room";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUser } from "../service/AuthService";
import { connectToRoom, sendMessage } from "../service/WebSocketService";
import Message from "./Message";
import { getAllMessagesFromARoom, saveMessage } from "../service/MessageService";
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';


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


  // this function check if the user has selected a certain the room, the logic of the selection is done in the Room component, here it check the value of currentRoom 
  // and then return if the room that is being rendered if selected by the user or not 
  const isSelected = (usernameToCheck: string) => {
    // the current room is your username + the username of the selected user separated by - (the order could change because the separation by - is sorted by alphabetical order)
    // so i get the username of the other user and check if is the value pased to the function, this means that the user clicked the div of the room of that username
    const othersUsername: string = currentRoom.split("-").filter(usernamePart => username !== usernamePart)[0];
    if (othersUsername === usernameToCheck) return true;
    return false;
  };

  useEffect(() => {
    authenticateUser(token).catch(()=> navigate("/register"));
    if (username !== undefined) {
      setCurrentConnection(connectToRoom(username,currentRoom));
      
      getAllMessagesFromARoom(token,currentRoom).then((messages: Message[]) => {
        if (messages.length > 0) {
          setMessages(messages)
        }
      })
    }
  }, []);

  useEffect(()=> {  
    if (connection) {
      getAllMessagesFromARoom(token,currentRoom).then((messages: Message[]) => {
          setMessages(messages)
      });
      
      connection.addEventListener("message",  e  => {
      const message = JSON.parse(e.data);
      if (message.SenderName === undefined) {
          setConnectedUsers(message);
      }
      else {
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
        {username !== currentUsername && !isSelected(currentUsername) &&
          <Room username={username} roomName={currentUsername} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={false} />
        } 
        {
          username !== currentUsername && isSelected(currentUsername) &&
          <Room username={username} roomName={currentUsername} connection={connection} setCurrentConnection={setCurrentConnection} setCurrentRoom={setCurrentRoom} isSelected={true} />
        }
      </div>
    ));
    setRooms(roomElements);
    }
  
  }, [connectedUsers]);



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
                    DestinationRoom: currentRoom,
                    SenderName: username
                  }
                  setMessages(messages => [...messages, message] )
                  sendMessage(connection, currentMessage);
                  saveMessage(token,message);
                  setCurrentMessage('');
                }
              }}
            />
            <button
              className='input-button'
              onClick={() => {
                const message: Message = {
                  Payload: currentMessage,
                  DestinationRoom: currentRoom,
                  SenderName: username
                }
                sendMessage(connection, currentMessage);
                setMessages(messages => [...messages, message]);
                saveMessage(token,message);
                setCurrentMessage('');
              }}>&#9658;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 

export default ChatAppHomePage

