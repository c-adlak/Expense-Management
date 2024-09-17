const Earning = require("../models/Earning");
const Expense = require("../models/Expense");
const saveData = async (req, res) => {
  let { amount, source, date, userid } = req.body;
  if (!amount) {
    res.status(400).send({ message: "please enter amount" });
  }
  if (!source) {
    res.status(400).send({ message: "please enter amount" });
  }
  if (!userid) {
    res.status(400).send({ message: "You are not registered" });
  }
  try {
    let details = await Earning.create({
      userid: userid,
      amount: amount,
      source: source,
      date: date,
    });
    console.log("yeha tk aagaya");

    console.log(details);

    res.status(200).send({ message: "your earning saved sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while fetching earnings.");
  }
};

const yourEarning = async (req, res) => {
  let userid = req.body.userid;

  if (!userid) {
    return res.status(400).send("User ID is required.");
  }

  try {
    let allearnings = await Earning.find({ userid: userid });
    console.log("yeha tk aagya ");

    console.log(allearnings);
    res.json(allearnings);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching earnings.");
  }
};

const saveExpense = async (req, res) => {
  let { amount, source, date, userid } = req.body;
  if (!amount) {
    res.status(400).send({ message: "please enter amount" });
  }
  if (!source) {
    res.status(400).send({ message: "please enter amount" });
  }
  if (!date) {
    res.status(400).send({ message: "please enter amount" });
  }
  if (!userid) {
    res.status(400).send({ message: "You are not registered" });
  }
  try {
    let result = await Expense.create({
      amount: amount,
      source: source,
      date: date,
      userid: userid,
    });
    console.log(result);

    res.status(200).send({ message: "your expense saved sucessfully" });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .send({ message: "An error occurred while fetching earnings." });
  }
};
const yourExpenses = async (req, res) => {
  let userid = req.body.userid;

  if (!userid) {
    return res.status(400).send("User ID is required.");
  }

  try {
    let allexpenses = await Expense.find({ userid: userid });
    console.log("yeha tk aagya ");

    console.log(allexpenses);
    res.status(200).json(allexpenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching earnings.");
  }
};
const report = async (req, res) => {
  const { startdate, enddate, uid } = req.body;
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  if (!uid) {
    return res.status(400).send("User ID is required.");
  }
  try {
    const earningdata = await Earning.find({
      $and: [
        { userid: uid },
        {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      ],
    });

    const expensedata = await Expense.find({
      $and: [
        { userid: uid },
        {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      ],
    });

    res.send({ earningdata: earningdata, expensedata: expensedata });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching earnings.");
  }
};

module.exports = {
  saveData,
  yourEarning,
  saveExpense,
  yourExpenses,
  report,
};
