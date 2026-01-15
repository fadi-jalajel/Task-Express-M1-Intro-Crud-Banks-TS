import express from "express";
import cardsRouter from "../src/routes/bank.route";
import accountsRouter from "../src/routes/accounts.routes";
import { connectDB } from "./db.config";

//place the DB method right after the import -- on top of the app
connectDB();

//Binding the application the server.
//Returns an express application which is saved in the app const
const app = express();

//Middleware
app.use(express.json());

//Routes (MongoDB)
//app.use("/card", cardsRouter);
app.use("/account", accountsRouter);

app.listen(3000, () => {
  console.log("The application is running on localhost:5000");
});
