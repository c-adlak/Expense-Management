const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("expense", expenseSchema);
