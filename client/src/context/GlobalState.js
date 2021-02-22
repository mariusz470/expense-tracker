import React, { createContext, useReducer } from "react";
import axios from "axios";

import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
  errors: null,
  loading: true,
  incomes: false,
  expenses: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  function toggleIncomes(incomes) {
    dispatch({
      type: "TOGGLE_INCOMES",
      payload: !incomes,
    });
  }
  function toggleExpenses(expenses) {
    dispatch({
      type: "TOGGLE_EXPENSES",
      payload: !expenses,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        incomes: state.incomes,
        expenses: state.expenses,
        getTransactions,
        deleteTransaction,
        addTransaction,
        toggleIncomes,
        toggleExpenses,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
