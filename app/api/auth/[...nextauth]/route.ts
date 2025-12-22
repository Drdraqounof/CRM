
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
        register: { label: "Register", type: "text", optional: true },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        // Registration flow
        if (credentials?.register === 'true') {
          // Check if user already exists
          const existing = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (existing) throw new Error('User already exists. Please sign in.');
          // Hash password
          const hashed = await hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name || credentials.email.split('@')[0],
              password: hashed,
            },
          });
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        }
        // Login flow
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) throw new Error('No account found for this email. Please register.');
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error('Password Incorrect');
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login
  },
  // Add callbacks, events, etc. as needed
});

export { handler as GET, handler as POST };
