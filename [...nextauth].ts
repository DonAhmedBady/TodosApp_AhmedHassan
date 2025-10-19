import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Type for a user stored in JSON
type User = {
  id: string;
  email: string;
  password: string; // hashed password
};

// Type for credentials coming from the login form
type Credentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) return null;

        // Read JSON file
        const filePath = path.join(process.cwd(), "data/todos.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        const data: { users: User[] } = JSON.parse(rawData);

        // Find user by email
        const user = data.users.find((u: User) => u.email === credentials.email);
        if (!user) return null;

        // Check password
        const isValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isValid) return null;

        // Return user object for NextAuth session
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login", // optional custom login page
  },
  session: {
    strategy: "jwt",
  },
});
