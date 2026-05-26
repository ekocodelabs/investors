import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";
import connectToDatabase from "./database";
import User from "@/models/User";
import { scryptSync } from "crypto";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectToDatabase();

        // 1. Find user in MongoDB
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // 2. Verify Password using your Crypto logic (salt:hash)
        const [salt, hashedPassword] = user.password.split(":");
        const hashToVerify = scryptSync(
          credentials.password,
          salt,
          64,
        ).toString("hex");

        if (hashToVerify !== hashedPassword) {
          throw new Error("Invalid credentials.");
        }

        // 3. Return user object (NextAuth saves this into the JWT)
        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/loginpage",
  },

  // callbacks: {
  //   // This callback is used to persist extra data into the JWT
  //   async jwt({ token, user }: { token: any; user?: any }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.firstName = user.firstName as String;
  //       token.lastName = user.lastName as String;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },

  //   // This callback makes that data available in the session on the client/server
  //   async session({ session, token }: { session: any; token: any }) {
  //     if (session.user) {
  //       session.user.id = token.id;
  //       session.user.firstName = token.firstName as String;
  //       session.user.lastName = token.lastName as String;
  //       session.user.email = token.email;
  //     }
  //     return session;
  //   },
  // },

  //   pages: {
  //     signIn: "/login", // Custom high-end login page we built
  //   },
  //   session: {
  //     strategy: "jwt", // Using JSON Web Tokens for fast session checks
  //   },
};
