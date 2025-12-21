import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Allow any email/password for demo purposes
        if (credentials?.email && credentials?.password) {
          return {
            id: credentials.email,
            name: credentials.email.split('@')[0],
            email: credentials.email
          };
        }
        return null;
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
