import { Schema, model} from "mongoose";

const cardSchema = new Schema({
    cardNumber: {type: Number, require: true},
    provider: {type: String, require: true},
    expiry: {type: String, require: true},
    year: {type: Number, require: true, min: 2010, max: 2026},
    Active: {type: Boolean, default: true}, 
})

export const Cards = model("Cards", cardSchema);