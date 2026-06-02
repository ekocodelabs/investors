import { Schema, model, models, Document } from "mongoose";

// Define the TypeScript interface for your User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  totalPortfolioAssets: string;
  dailyProfit: string;
  weeklyProfit: string;
  transactionHistory: Array<{
    transactionID: string;
    pair: string;
    date: string;
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    activity: "Deposit" | "Withdrawal" | "Trade Result";
  }>;
  createdAt: Date;
}

const userSchema = new Schema({
  // Personal Identification
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Financial Overview
  totalPortfolioAssets: { type: String, default: "0.00" },
  dailyProfit: { type: String, default: "0.00" },
  weeklyProfit: { type: String, default: "0.00" },

  // Inbound/Outbound Transaction Ledger
  transactionHistory: [
    {
      transactionID: { type: String, required: true, unique: true },
      pair: { type: String, required: true },
      date: { type: String, required: true },
      amount: { type: String, required: true },
      status: {
        type: String,
        enum: ["Completed", "Pending", "Failed"],
        default: "Pending",
      },
      activity: {
        type: String,
        enum: ["Deposit", "Withdrawal", "Trade Result"],
        required: true,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

// Senior Dev Check: Ensures we don't re-compile the model on Hot Module Replacement (HMR)
const User = models.User || model<IUser>("User", userSchema);

export default User;
