import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { transactions, getTransactions, incomes, expenses } = useContext(
    GlobalContext
  );

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (incomes && expenses)
    return (
      <>
        <h3>History</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      </>
    );
  if (incomes)
    return (
      <>
        <h3>History</h3>
        <ul className="list">
          {transactions.map(
            (transaction) =>
              transaction.amount > 0 && (
                <Transaction key={transaction._id} transaction={transaction} />
              )
          )}
        </ul>
      </>
    );
  if (expenses)
    return (
      <>
        <h3>History</h3>
        <ul className="list">
          {transactions.map(
            (transaction) =>
              transaction.amount < 0 && (
                <Transaction key={transaction._id} transaction={transaction} />
              )
          )}
        </ul>
      </>
    );
  return null;
};

export default TransactionList;
