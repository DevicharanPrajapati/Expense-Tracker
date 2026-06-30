// import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContexts";
import { FaArrowTrendUp } from "react-icons/fa6";

//style code

const FilterCard = () => {
  const { token } = useAuth();

  const [filter, setFilter] = useState("all");

  const styleBtn = (value) =>
    `p-2 px-6 rounded-md transition-colors border-1 ${
      filter === value
        ? "bg-green-600 text-white"
        : "bg-emerald-300 text-black hover:bg-emerald-200"
    }`;

  useEffect(() => {
    const filterData = async () => {
      try {
        const response = await api.get(`/transaction/filter?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    filterData();
  }, [filter, token]);

  return (
    <div className="bg-emerald-100 p-4  rounded-xl shadow-md mb-4">
      <h2
        className="flex items-center gap-2 text-md font-bold mb-4 
       text-cyan-700 "
      >
        <FaArrowTrendUp color="olive" />
        Filter Your Data
      </h2>

      <div className="flex items-center gap-2 justify-around">
        <button
          className={styleBtn("today")}
          onClick={() => setFilter("today")}
        >
          Today
        </button>

        <button className={styleBtn("week")} onClick={() => setFilter("week")}>
          Week
        </button>

        <button
          className={styleBtn("month")}
          onClick={() => setFilter("month")}
        >
          Month
        </button>

        <button className={styleBtn("year")} onClick={() => setFilter("year")}>
          Year
        </button>

        <button className={styleBtn("all")} onClick={() => setFilter("all")}>
          All
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
