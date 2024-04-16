"use client";
import { useEffect, useState } from "react";
import { Expense } from "../types/types";
import { api } from "../api/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>();

  const fetchExpenses = async () => {
    const fetchedExpenses = await api.getExpenses();
    setExpenses(fetchedExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <div>
        <div className="input">
          <h1>Add Expense</h1>
          <div className="input-add">
            <div className="name">
              <p>Name</p>
              <input type="text" name="name" />
            </div>
            <div className="cost">
              <p>Cost</p>
              <input type="text" name="cost" />
            </div>
            <button>Add</button>
          </div>
          <h1>Stats</h1>
          <div className="stats">
            <p>Sum</p>
            <p>Count</p>
          </div>
        </div>
        <div className="content">
          <ul className="expenses-list">
            {expenses?.map((expense) => (
              <li key={expense.id} className="card">
                <div className="card-text">
                  <div className="card-name">Name: {expense.name}</div>
                  <div className="card-cost">Cost: {expense.cost}</div>
                </div>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Expenses;
