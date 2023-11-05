import { useEffect } from "react";
import Room from "./Room";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { authenticateUser, loginUser } from "../service/AuthService";
import { connectToRoom } from "../service/WebSocketService";


const ChatAppHomePage: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;
  const navigate = useNavigate();
  let connection;

  useEffect(() => {
    authenticateUser(token).catch(()=> navigate("/register"));
    connection = connectToRoom()
  }, []);

  return (
    <div className="App">
      <header className="chat-app-header">
        <h1>Chat App</h1>
      </header>
      <div className="chat-container">
        <div className="room-container">
          <Room roomName="Global"/>
        </div>
        <div className="message-container"></div>
      </div>
    </div>
  );
}
 

export default ChatAppHomePage

