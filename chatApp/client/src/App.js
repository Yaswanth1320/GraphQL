import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { AuthProvider } from "./Context/auth";
import { MessageProvider } from "./Context/message";

function App() {
  return (
    <>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </>
  );
}

export default App;
