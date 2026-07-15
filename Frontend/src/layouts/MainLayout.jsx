import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Footer from "../components/Footer"

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="min-h-screen">
      <Navbar 
      setIsOpen={setIsOpen} 
      />

      <div className="flex">
        <Sidebar 
         isOpen={isOpen} setIsOpen={setIsOpen}
        />

        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>

      <Footer 
      setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default MainLayout;