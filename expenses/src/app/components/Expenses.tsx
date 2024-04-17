"use client";
import { useEffect, useState } from "react";
import { Expense } from "../types/types";
import { api } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
      cost: +newCost,
    };
    api.postExpenses(expenseObject).then(fetchExpenses);
    setNewName("");
    setNewCost("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCost(event.target.value);
  };

  const handleDelete = (id: number) => {
    api.deleteExpense(id).then(fetchExpenses);
  };

  return (
    <div className="entire-screen">
      <div className="contents">
        <div className="input">
          <h1 className="header">Add Expense</h1>
          <form onSubmit={addExpense} className="form">
            <p className="name-text">Name</p>
            <input
              type="text"
              name="name"
              value={newName}
              onChange={handleNameChange}
              className="name-input"
              required
            />
            <p className="cost-text">Cost</p>
            <input
              type="number"
              name="cost"
              value={newCost}
              onChange={handleCostChange}
              className="cost-input"
              required
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <h1 className="header">Stats</h1>
          <div className="stats">
            <p>
              Sum:{" "}
              {expenses?.reduce(
                (accumulator, currentValue) => accumulator + currentValue.cost,
                0
              )}
            </p>
            <p>Count: {expenses?.length}</p>
          </div>
        </div>
        <div className="contents-card">
          <ul className="expenses-list">
            {expenses?.map((expense) => (
              <li key={expense.id} className="card">
                <div className="card-text">
                  <div className="card-name">
                    <div className="card-name-text">Name: </div>
                    <div>{expense.name}</div>
                  </div>
                  <div className="card-cost">
                    <div className="card-cost-text">Cost: </div>
                    <div>{expense.cost}</div>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => handleDelete(expense.id)}
                  style={{ cursor: "pointer" }}
                  className="icon"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
