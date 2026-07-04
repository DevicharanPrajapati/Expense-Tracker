const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");

const getDashboardData = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Total Income
    const incomeResult = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "income",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Total Expense
    const expenseResult = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = incomeResult[0]?.total || 0;
    const totalExpense = expenseResult[0]?.total || 0;
    const balance = totalIncome - totalExpense;

    // Expense by Category (Pie Chart)
    const categoryWiseExpense = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          category: "$category.name",
          total: 1,
        },
      },
    ]);

    // Monthly Expense (Line Chart)
    const monthlyExpense = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$transactionDate" },
            month: { $month: "$transactionDate" },
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.month" },
              "/",
              { $toString: "$_id.year" },
            ],
          },
          total: 1,
        },
      },
    ]);

    // Last 7 Days Expense
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const weeklyExpense = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          transactionDate: {
            $gte: last7Days,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m",
              date: "$transactionDate",
            },
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          total: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      balance,
      totalIncome,
      totalExpense,
      categoryWiseExpense,
      monthlyExpense,
      weeklyExpense,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data.",
    });
  }
};

module.exports = { getDashboardData };
