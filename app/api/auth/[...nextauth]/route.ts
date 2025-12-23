import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await axios.post<{
            data: {
              id: string;
              name: string;
              email: string;
            };
          }>(`${process.env.API_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          console.log("res", res.data?.data);
          const user = res.data?.data;

          if (!user?.id) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          const err = error as AxiosError;
          console.error("Login failed:", err.response?.data);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
