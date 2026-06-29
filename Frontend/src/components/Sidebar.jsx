// import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useAuth } from "../context/AuthContexts";




const Sidebar = () => {
  const {user} = useAuth();
  return (
    <div className="sidebar min-h-screen min-w-60 shadow-xl p-4">
      {/* //user */}
       <div className="flex gap-1 items-center border-b-2 border-olive-300 p-2">
        <div className="w-10 h-10 bg-red-400 rounded-full flex justify-center items-center">
          <h2 className="font-bold text-2xl text-center">{user?.name[0]}</h2>
        </div>
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* //DashBoard icons */}
      <div className="flex items-center gap-2 mt-8 p-4 hover:bg-lime-200 bg-lime-300 rounded-xl">
      <MdDashboard size={20}/>
      <h2 className="text-md font-bold">Dashboard</h2>
      </div>

  {/* income  */}
  <div>
    <div className="flex items-center gap-2 mt-4 p-4 hover:bg-lime-200 bg-lime-300 rounded-xl">
      <FaArrowAltCircleUp size={20}/>
      <h2 className="text-md font-bold">Income</h2>
      </div>
  </div>

   {/* Expense  */}
  <div>
    <div className="flex items-center gap-2 mt-4 p-4 hover:bg-lime-200 bg-lime-300 rounded-xl">
      <FaArrowAltCircleDown size={20}/>
      <h2 className="text-md font-bold">Expense</h2>
      </div>
  </div>

    </div>
  )
}

export default Sidebar