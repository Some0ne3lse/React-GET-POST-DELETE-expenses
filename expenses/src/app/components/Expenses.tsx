"use client";
import { useEffect, useState } from "react";
import { Expense } from "../types/types";
import { api } from "../api/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState("");

  const fetchExpenses = async () => {
    const fetchedExpenses = await api.getExpenses();
    setExpenses(fetchedExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expenseObject = {
      name: newName,
      cost: newCost,
    };
    api.postExpenses(expenseObject);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCost(event.target.value);
  };

  return (
    <>
      <div>
        <div className="input">
          <form onSubmit={addExpense}>
            <h1>Add Expense</h1>
            <div className="input-add">
              <div className="name">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={newName}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="cost">
                <p>Cost</p>
                <input
                  type="number"
                  name="cost"
                  value={newCost}
                  onChange={handleCostChange}
                  required
                />
              </div>
              <button type="submit">Add</button>
            </div>
          </form>
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
