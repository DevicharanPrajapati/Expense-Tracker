import { FaWallet } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../context/AuthContexts";
import { Link } from "react-router-dom";

const Navbar = ({ setIsOpen }) => {
  const { user } = useAuth();

  return (
    <div className="p-2 px-4 sm:px-8 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        {/* Hamburger - Mobile Only */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <HiMenu size={25} />
        </button>

        {/* Logo */}
        <div className="logo cursor-pointer hover:bg-olive-200 p-2 rounded-xl">
          <h1 className="text-lg sm:text-xl font-bold font-sans flex gap-1 items-center">
            <FaWallet size={25} color="red" />
            PocketTracker
          </h1>
        </div>
      </div>

      {/* Right */}
      <Link to="/profile">
        <div className="flex gap-1 items-center cursor-pointer hover:bg-olive-200 p-2 rounded-xl">
          <div className="w-10 h-10 bg-green-600 rounded-full flex justify-center items-center">
            <h2 className="font-bold text-2xl text-center text-amber-50">
              {user?.name?.charAt(0).toUpperCase()}
            </h2>
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold">{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
