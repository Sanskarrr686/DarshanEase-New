import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import SignupSelection from "./Components/SignupSelection";

// Admin
import Ahome from "./Admin/Ahome";
import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";

// Organizer
import Ohome from "./Organizer/Ohome";
import Ologin from "./Organizer/Ologin";
import Osignup from "./Organizer/Osignup";
import MyTemple from "./Organizer/MyTemple";
import Odarshans from "./Organizer/Odarshans";
import Bookings from "./Organizer/Bookings";
import CreateTemple from "./Organizer/CreateTemple";
import EditTemple from "./Organizer/EditTemple";
import CreatedDarshan from "./Organizer/CreatedDarshan";

// User
import Ulogin from "./Users/ulogin";
import Usignup from "./Users/usignup";
import Uhome from "./Users/Uhome";
import Utemples from "./Users/Utemples";
import Mybookings from "./Users/Mybookings";
import BookDarshan from "./Users/BookDarshan";
import Utemple from "./Users/Utemple";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupSelection />} />

        <Route path="/ulogin" element={<Ulogin />} />
        <Route path="/usignup" element={<Usignup />} />
        <Route path="/uhome" element={<Uhome />} />
        <Route path="/utemples" element={<Utemples />} />
        <Route path="/bookdarshan/:id" element={<BookDarshan />} />
        <Route path="/utemple/:id" element={<Utemple />} />
        <Route path="/mybookings" element={<Mybookings />} />

        <Route path="/admin/login" element={<Alogin />} />
        <Route path="/admin/signup" element={<Asignup />} />
        <Route path="/admin/home" element={<Ahome />} />

        <Route path="/organizer/login" element={<Ologin />} />
        <Route path="/organizer/signup" element={<Osignup />} />
        <Route path="/organizer/home" element={<Ohome />} />
        <Route path="/organizer/mytemple" element={<MyTemple />} />
        <Route path="/organizer/darshans" element={<Odarshans />} />
        <Route path="/organizer/bookings" element={<Bookings />} />
        <Route path="/organizer/createtemple" element={<CreateTemple />} />
        <Route path="/organizer/edittemple/:id" element={<EditTemple />} />
        <Route path="/organizer/createdarshan" element={<CreatedDarshan />} />
      </Routes>
    </>
  );
}

export default App;
