// import React from 'react'
import { FaWallet } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className=" p-2 px-8 flex justify-between items-center shadow-md">
      <div className="logo cursor-pointer hover:bg-olive-200 p-2 rounded-xl">
        <h1 className="text-xl font-bold font-sans cursor-pointer select-none flex gap-1 items-center">
          <FaWallet size={25} color="red" />
          PocketTrack
        </h1>
      </div>

      <div className="flex gap-1 items-center cursor-pointer  hover:bg-olive-200 p-2 rounded-xl">
        <div className="w-10 h-10 bg-red-400 rounded-full flex justify-center items-center">
          <h2 className="font-bold text-2xl text-center">D</h2>
        </div>
        <div>
          <p className="font-semibold">Devicharan</p>
          <p>devicharan@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
