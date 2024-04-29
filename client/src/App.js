import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Landingscreen from "./screens/Landingscreen";
function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route exact path="/home" element={<Homescreen />} />
            <Route exact path="/book/:roomid/:fromDate/:toDate" element={<Bookingscreen />} />
            <Route exact path="/register" element={<Registerscreen/>} />
            <Route exact path="/login" element={<Loginscreen/>} />
            <Route exact path="/" element={<Landingscreen/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
