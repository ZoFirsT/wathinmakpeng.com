import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials", 
      credentials: {
        login: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error("กรุณากรอกอีเมลหรือชื่อผู้ใช้และรหัสผ่าน");
        }

        await connectDB();
        
        // Check if login is email or username
        const user = await User.findOne({
          $or: [
            { email: credentials.login },
            { username: credentials.login }
          ]
        });
        
        if (!user) {
          throw new Error("ไม่พบบัญชีผู้ใช้นี้");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          throw new Error("รหัสผ่านไม่ถูกต้อง");
        }

        // Check user role
        if (user.role === 'user') {
          throw new Error("ไม่มีสิทธิการเข้าถึง");
        }

        if (user.role !== 'admin') {
          throw new Error("คุณไม่มีสิทธิ์เข้าถึง");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 