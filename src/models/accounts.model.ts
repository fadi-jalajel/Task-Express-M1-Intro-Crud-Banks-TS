import { Schema, model} from "mongoose";

const accountSchema = new Schema({
    username: {type: String, require: true},
    funds: {type: Number, require: true, default: 0},
    timeStamp: {type: Date, default: Date.now()}
})

export const Accounts = model("Accounts", accountSchema);