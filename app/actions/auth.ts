"use server";

import connectToDatabase from "@/config/database";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { scryptSync, randomBytes } from "crypto";

// Helper to hash passwords without external dependencies
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

// Helper to verify passwords against the stored salt:hash string
// function verifyPassword(password: string, storedValue: string) {
//   const [salt, hashedPassword] = storedValue.split(":");
//   const hashToVerify = scryptSync(password, salt, 64).toString("hex");
//   return hashToVerify === hashedPassword;
// }

export async function registerUser(formData: FormData) {
  await connectToDatabase();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Credentials already registered.");
  }

  // 2. Hash Password using built-in Crypto
  const securedPassword = hashPassword(password);

  try {
    // 3. Create user with seeded arrays
    await User.create({
      firstName,
      lastName,
      email,
      password: securedPassword,
      totalPortfolioAssets: 0,
      dailyProfit: 0,
      weeklyProfit: 0,
      transactionHistory: [
        {
          transactionID: `AUL-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
          pair: "SYSTEM",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          amount: "+$0.00",
          status: "Completed",
          activity: "Deposit",
        },
      ],
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create high-end account.");
  }

  redirect("/welcome");
}

export async function resetUserPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const newPassword = formData.get("newpassword") as string;

  // 1. Structural Sanity Validation
  if (!email || !newPassword || newPassword.length < 8) {
    return {
      success: false,
      message: "Invalid payload. Passwords must be at least 8 characters.",
    };
  }

  await connectToDatabase();

  // 1. Check for existing user
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("User with provided email does not exist.");
  }

  // 2. Hash Password using built-in Crypto
  const securedPassword = hashPassword(newPassword);

  try {
    // 3. Update user password in database and then redirect to login page
    await User.updateOne({ email }, { password: securedPassword });
  } catch (error) {
    console.error("Database Error:", error);
    alert("Failed to reset password. Please try again later.");
    return {
      success: false,
      message: "Failed to reset password. Please try again later.",
    };
  }

  redirect("/loginpage");
}
