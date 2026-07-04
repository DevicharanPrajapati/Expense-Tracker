import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#F43F5E",
];

const ExpensePieChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-[380px]">
      <h2 className="text-lg font-semibold mb-4">
        Expense by Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;