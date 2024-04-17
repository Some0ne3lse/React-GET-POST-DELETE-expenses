import { Expense } from "../types/types";

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response;
};

const postExpenses = async (expense: object): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/create-expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response;
};

const deleteExpense = async (id: number): Promise<Expense[]> => {
  const res = await fetch(`http://localhost:3001/api/expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  return response;
};

export const api = {
  getExpenses,
  postExpenses,
  deleteExpense
}