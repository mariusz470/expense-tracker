import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses = () => {
  const {
    transactions,
    incomes,
    expenses,
    toggleIncomes,
    toggleExpenses,
  } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  const handleIncomes = (e) => {
    e.preventDefault();
    toggleIncomes(incomes);
  };
  const handleExpenses = (e) => {
    e.preventDefault();
    toggleExpenses(expenses);
  };

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{income}</p>
        <button className="show-btn" onClick={handleIncomes}>
          {" "}
          {incomes ? "Hide" : "Show"}{" "}
        </button>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{expense}</p>
        <button className="show-btn" onClick={handleExpenses}>
          {expenses ? "Hide" : "Show"}{" "}
        </button>
      </div>
    </div>
  );
};

export default IncomeExpenses;
