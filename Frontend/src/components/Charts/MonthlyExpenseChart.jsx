import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MonthlyExpenseChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-[380px]">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Expense
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;