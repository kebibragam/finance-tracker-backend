import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: Date;
  description: string;
  paymentMethod: string;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  paymentMethod: String,
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
