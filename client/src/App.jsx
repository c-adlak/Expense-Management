import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TakeEarning from "./components/TakeEarning";
import YourEarnings from "./components/YourEarnings";
import TakeExpense from "./components/TakeExpense";
import YourExpenses from "./components/YourExpenses";
import TotalSaving from "./components/TotalSaving";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<TakeEarning />} />
            <Route path="takeearning" element={<TakeEarning />} />
            <Route path="yourearnings" element={<YourEarnings />} />
            <Route path="takeexpense" element={<TakeExpense />} />
            <Route path="yourExpenses" element={<YourExpenses />} />
            <Route path="totalSavings" element={<TotalSaving />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
