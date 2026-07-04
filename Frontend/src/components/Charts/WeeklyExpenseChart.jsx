import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const WeeklyExpenseChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-[380px]">
      <h2 className="text-lg font-semibold mb-4">
        Weekly Expense
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#10B981"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyExpenseChart;