import { Request, Response } from "express";
import { accounts, Accounts } from "../models/data.model";


export const getAllAccounts = (req: Request, res: Response) => {
    res.status(200).json(accounts);
}


export const createNewAccount = (req: Request, res: Response) => {
    const {username} = req.body;
    const id = accounts.length;
    const funds = 0;
    const NewAccount: Accounts = {
        id, 
        username, 
        funds,
    };

    accounts.push(NewAccount);
    res.status(201).json(NewAccount);
}

export const deleteAccount = (req: Request, res: Response) => {

    //get accountId from URL
    const accountId = +req.params.accountId;

    //Find index of the account
    const accountIndex = accounts.findIndex((acct) => acct.id === accountId);

    //If account not found
    if (accountIndex === -1) {
        return res.status(404).json({message: `Account with id ${accountId} is not found`});
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
    const {funds} = req.body;

    //find the account's index in the array
    const account = accounts.find((acct) => acct.id === accountId);

    //if account not found 
    if (!account) {
        return res.status(404).json({message: `Account with ID ${accountId} was not found`});
    } else {
        //update the account fields
        account.funds = req.body.funds;
    }

    return res.status(200).json(account);
}