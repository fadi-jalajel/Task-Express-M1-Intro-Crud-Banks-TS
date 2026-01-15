import { Request, Response } from "express";
import { accounts, Accounts } from "../models/data.model";
import { Cards } from "../models/cards.model";

//Get All Cards from DB (Async function because there is waiting to get the data)
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Cards.find(); //.find() is a mongoose function.. there are many more..
    res.status(200).json({
      status: "success",
      message: "cards fetched successfully",
      cards,
    });
  } catch (error) {
    //always 500 because it is realted to server error
    res.status(500).json({ message: "Error Fetching cards", error });
  }
};

//Create new Card
export const createNewCard = async (req: Request, res: Response) => {
  try {
    //Request input from user of app
    const { cardNumber, provider, expiry, year } = req.body;

    //check if card exists
    const foundCard = await Cards.findOne({ cardNumber });
    if (foundCard) {
      res.status(400).json({ message: "card already exists" });
    }

    //Create new Card
    const newCard = await Cards.create({ provider, expiry, year });

    //Send a response to Client
    res.status(201).json({ message: "new card configured", newCard });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching cards", error });
  }
};

//Request input from client via URL
//const { id } = req.params;
// const updateCard = await Cards.findByIdAndUpdate(id, {provider, expiry}, new: {true});  return new data to user

export const getAllAccounts = (req: Request, res: Response) => {
  res.status(200).json(accounts);
};

export const createNewAccount = (req: Request, res: Response) => {
  const { username } = req.body;
  const id = accounts.length;
  const funds = 0;
  const NewAccount: Accounts = {
    id,
    username,
    funds,
  };

  accounts.push(NewAccount);
  res.status(201).json(NewAccount);
};

export const deleteAccount = (req: Request, res: Response) => {
  //get accountId from URL
  const accountId = +req.params.accountId;

  //Find index of the account
  const accountIndex = accounts.findIndex((acct) => acct.id === accountId);

  //If account not found
  if (accountIndex === -1) {
    return res
      .status(404)
      .json({ message: `Account with id ${accountId} is not found` });
  } else {
    //if account found, remove account from array
    accounts.splice(accountIndex, 1);
  }

  //send back success response (no resposne body), used for DELETE
  return res.status(204).send();
};

export const updateAccount = (req: Request, res: Response) => {
  //Get accountID to be updated
  const accountId = +req.params.accountId;
  //Get the Amount to update account funds
  const { funds } = req.body;

  //find the account's index in the array
  const account = accounts.find((acct) => acct.id === accountId);

  //if account not found
  if (!account) {
    return res
      .status(404)
      .json({ message: `Account with ID ${accountId} was not found` });
  } else {
    //update the account fields
    account.funds = req.body.funds;
  }

  return res.status(200).json(account);
};

export const getAccountByUsername = (req: Request, res: Response) => {
  //Get username to be updated
  const { username } = req.params;
  const { currency } = req.query;

  const account = accounts.find((acct) => acct.username === username);

  if (!account) {
    return res
      .status(404)
      .json({ message: `Account with username ${username} was not found` });
  } else {
    if (currency === "usd") {
      return res.status(200).json({
        ...account,
        funds: account.funds * 3.25,
        currency: "USD",
      });
    }
  }

  //if no currency, return derault currency
  return res.status(200).json({ ...account, currency: "KWD" });
};
