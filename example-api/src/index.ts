// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser  from "body-parser"

let nextId = 4;
let expenses = [
	{ id: 1, name: "Beer", cost: 5690 },
	{ id: 2, name: "Candy", cost: 355 },
	{ id: 3, name: "VIM course", cost: 10990 },
];
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */

const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));

console.log(process.env.PORT);
const port = 3001;

api.get("/api/expenses", (req, res) => {
	console.log("Getting expenses:", expenses);
	return res.json(expenses);
});

api.post("/api/create-expense", (req, res) => {
	console.log(req);
	const name = req.body.name;
	const cost = req.body.cost;


	if (!name || !cost) {
		res.json({
			success: false,
			error: "Must supply name and cost for the expense",
		});
		return;
	}

	const expense = { id: nextId, name, cost };
	expenses.push(expense);
	nextId += 1;

	return res.json({
		success: true,
		expense,
	});
});

api.get("/api/expense/:id", (req, res) => {
	const expenseId = parseInt(req.params.id, 10);
	const expense = expenses.find((e) => e.id === expenseId);
	if (expense) {
		return res.json(expense);
	}

	res.json({
		success: false,
		error: `Could not find expense with id=${expenseId}`,
	});
});

api.delete("/api/expense/:id", (req, res) => {
	const expenseId = parseInt(req.params.id, 10);
	const expense = expenses.find((e) => e.id === expenseId);
	if (expense) {
		expenses = expenses.filter((e) => e.id !== expenseId);
		res.json({
			success: true,
			deletedExpense: expense,
		});
	} else {
		res.json({
			success: false,
			error: `Could not find expense with id=${expenseId}`,
		});
	}
});

api.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
