import { FaIndianRupeeSign } from "react-icons/fa6";
import { useBalance } from "../context/BalanceDataContext";

const BalanceCard = () => {
  const {balance, loading} = useBalance();
  
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <p className="text-gray-500 text-sm font-medium">Total Balance</p>
        <div className="flex items-center mt-6">
          <FaIndianRupeeSign className="text-3xl text-gray-800" />
          <span className="text-4xl font-bold text-gray-800">Loading...</span>
        </div>
      </div>
    );
  }
    
  const amountColor = balance > 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm font-medium">Total Balance</p>

        <div className="bg-green-100 p-2 rounded-full">
          <FaIndianRupeeSign className="text-green-600 text-lg" />
        </div>
      </div>

      {/* Balance */}
      <div className="flex items-center mt-6">
        <FaIndianRupeeSign className="text-3xl text-gray-800" />
        <span className={`text-4xl font-bold ${amountColor}`}>
          {balance?.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
