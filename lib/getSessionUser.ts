//get the session, the get the email, then use the email to query the database for the user, then return the user object
// import { getServerSession } from "next-auth";
// import connectToDatabase from "@/config/database";
// import User from "@/models/User";
// import { authOptions } from "@/config/authOptions";

// type LeanUser = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   totalPortfolioAssets: string;
//   dailyProfit: string;
//   weeklyProfit: string;
//   transactionHistory: Array<{
//     transactionID: string;
//     pair: string;
//     date: string;
//     amount: string;
//     status: "Completed" | "Pending" | "Failed";
//     activity: "Deposit" | "Withdrawal" | "Trade Result";
//     _id: string;
//   }>;
//   createdAt: string;
//   __v: number;
// };

// export async function getSessionUser({
//   emailAddress,
// }: {
//   emailAddress: any;
// }): Promise<LeanUser | null> {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return null;
//   }
//   await connectToDatabase();
//   const user = await User.findOne({ email: emailAddress }).lean();
//   return user as LeanUser | null;
// }
