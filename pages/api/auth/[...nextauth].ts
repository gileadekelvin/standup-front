import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { getAuthTokenFromApi } from './login';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && account?.id_token) {
        user.accessToken = await getAuthTokenFromApi(account?.id_token);
        if (user.accessToken) {
          return true;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token = { accessToken: user.accessToken };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
