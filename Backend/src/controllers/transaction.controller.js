const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model.js");
const Category = require("../models/category.model.js");

const createTransaction = async (req, res) => {
  const { title, amount, type, description, paymentMethod, category } =
    req.body;

  try {
    if (!title || !amount || !type || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    console.log(category);

    const categoryExists = await Category.findOne({
      _id: category,
      userId: req.user.id,
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const addTransction = await Transaction.create({
      user: req.user.id,
      category,
      title,
      amount,
      type,
      description,
      paymentMethod,
    });

    return res.status(200).json({
      success: true,
      message: "transaction added successfully!",
      Transaction: addTransction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const showAllTransaction = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not found" });
    }
    const transactions = Transaction.findById({ user });

    if (!transactions) {
      return res
        .status(401)
        .json({ success: false, message: "Transaction are not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Transactions are fetched successfully!",
      Transaction: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const showIncome = async (req, res) => {};

const showExpense = async (req, res) => {};

module.exports = {
  createTransaction,
  showAllTransaction,
  showIncome,
};
