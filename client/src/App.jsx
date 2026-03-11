import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

// Admin
import Ahome from "./Admin/Ahome";
import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";

// Organizer
import Ohome from "./Organizer/Ohome";
import Ologin from "./Organizer/Ologin";
import Osignup from "./Organizer/Osignup";

// User
import Ulogin from "./Users/ulogin";
import Usignup from "./Users/usignup";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* User */}
        <Route path="/ulogin" element={<Ulogin />} />
        <Route path="/usignup" element={<Usignup />} />

        {/* Admin */}
        <Route path="/admin/login" element={<Alogin />} />
        <Route path="/admin/signup" element={<Asignup />} />
        <Route path="/admin/home" element={<Ahome />} />

        {/* Organizer */}
        <Route path="/organizer/login" element={<Ologin />} />
        <Route path="/organizer/signup" element={<Osignup />} />
        <Route path="/organizer/home" element={<Ohome />} />

      </Routes>
    </>
  );
}

export default App;