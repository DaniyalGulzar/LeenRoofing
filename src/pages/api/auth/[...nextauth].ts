import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      role: string; // Add the custom role property
      name?: string | null;
      first_name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string; // Add the token property here
      profile_setup?: any;
    } & DefaultUser;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const res = await fetch(
          `https://wtntech.com/lms-portal/public/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const user = await res.json();

        if (!res.ok) {
          throw new Error(user?.message || "Invalid credentials");
        }

        if (user?.result) {
          return {
            id: user?.result?.id,
            role: user?.result?.role,
            email: user?.result?.email,
            token: user?.result?.access_token,
            user: user?.result,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        session.token = token.token;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login?error=true",
  },
  secret: "acha",
});
