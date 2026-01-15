import { Request, Response } from "express";
import { Accounts } from "../models/accounts.model";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Accounts.find();
    res.status(200).json({
      status: "success",
      message: "Accounts fetched successfully",
      accounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const funds = 0;

    //check if username exists
    const foundAccount = await Accounts.findOne({ username });
    if (foundAccount) {
      res.status(400).json({ message: "Account already exists" });
    }

    const newAccount = await Accounts.create({ username, funds });

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    //find account by ID
    const accountToUpdate = await Accounts.findById({ accountId });
    if (accountToUpdate) {
      const account = accountToUpdate.updateOne(req.body);
      res.status(204).json({ message: "Account udpated", account });
    } else {
      res.status(404).json({ message: "Account does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const accountToDelete = await Accounts.findById({ accountId });
    if (accountToDelete) {
      await accountToDelete.deleteOne();
      res.status(204).json({ message: "Account deleted" });
    } else {
      res.status(404).json({ message: "Account does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};
