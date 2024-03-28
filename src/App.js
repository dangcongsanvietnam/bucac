import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/UserAccount/Login/Login";
import Signup from "./components/UserAccount/Signup/Signup";
import NavBar from './layouts/log-nav/NavBar';

function App() {
  return (
    <div className="Container">

    <BrowserRouter>
      <NavBar />
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </div>

  );

}

export default App;
