import { Outlet } from "react-router-dom";
import "./input.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-white font-nunito">
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </div>
  );
}

export default App;
