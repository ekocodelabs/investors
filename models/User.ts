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
  withdrawalProfit: string;
  tradeHistory: Array<{
    time: string;
    pair: string;
    amount: string;
    isWin: boolean;
  }>;
  transactionHistory: Array<{
    transactionID: string;
    pair: string;
    date: string;
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    activity: "Deposit" | "Withdrawal" | "Trade Result";
  }>;
  createdAt: Date;
  stakedCapital: string;
  averageAPY: string;
  availableToClaim: string;
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
  withdrawalProfit: { type: String, default: "0.00" },

  // Trade History Ledger
  tradeHistory: [
    {
      time: { type: String, required: true },
      pair: { type: String, required: true },
      amount: { type: String, required: true },
      isWin: { type: Boolean, default: true },
    },
  ],

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

  //add this fields to this schema..stakedCapital, averageAPY, availableToClaim
  stakedCapital: { type: String, default: "0.00" },
  averageAPY: { type: String, default: "0.00" },
  availableToClaim: { type: String, default: "0.00" },
});

// Senior Dev Check: Ensures we don't re-compile the model on Hot Module Replacement (HMR)
const User = models.User || model<IUser>("User", userSchema);

export default User;
