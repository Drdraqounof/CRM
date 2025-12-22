import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// In-memory user store (for demo only, resets on server restart)
const users: { [email: string]: { id: string, name: string, email: string, password: string } } = {};

// You can add CredentialsProvider and other providers as needed

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
        register: { label: "Register", type: "text", optional: true },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = users[credentials.email];
        if (!user) {
          // If this is a registration attempt, allow registration via credentials.register
          if (credentials?.register === 'true') {
            const newUser = {
              id: credentials.email,
              name: credentials.email.split('@')[0],
              email: credentials.email,
              password: credentials.password
            };
            users[credentials.email] = newUser;
            return { ...newUser, password: undefined };
          }
          // Not registered
          throw new Error('No account found for this email. Please register.');
        }
        if (user.password !== credentials.password) {
          throw new Error('Password Incorrect');
        }
        return { ...user, password: undefined };
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
