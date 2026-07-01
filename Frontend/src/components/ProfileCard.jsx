// import React from 'react'

import { useAuth } from "../context/AuthContexts";
import { FaUser } from "react-icons/fa";

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center mt-6 gap-4 shadow-md p-4 rounded-2xl bg-white">
      <div className="bg-green-100 p-4 rounded-full">
        <FaUser className="text-3xl text-green-600" />
      </div>

      <div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>

        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
