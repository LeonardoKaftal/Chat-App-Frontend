import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"
import ChatAppHomePage from "./component/ChatAppHomePage";
import "./chat.css"
import RegisterHomePage from "./component/RegisterHomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./component/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<ChatAppHomePage />} />
          <Route path="/register" element={<RegisterHomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
