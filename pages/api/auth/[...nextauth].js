import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const client = await clientPromise;
          const db = client.db("EaseMind");
          const user = await db.collection("users").findOne({ email });

          if (!user) {
            console.log("no user found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("password do not match");
            return null;
          }

          const { password: userPassword, ...userWithoutPassword } = user;

          return userWithoutPassword;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Check if the user still exists in the database
      try {
        const client = await clientPromise;
        const db = client.db("EaseMind");
        const user = await db
          .collection("users")
          .findOne({ email: session.user.email });

        if (!user) {
          // User not found in the database, return null to destroy the session
          return null;
        }

        // User found, return the session
        return session;
      } catch (error) {
        console.error("Error checking user existence:", error);
        // In case of an error, we'll destroy the session to be safe
        return null;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
