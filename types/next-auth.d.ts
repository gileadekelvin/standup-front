// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
  }

  interface Session {
    token: {
      accessToken: string;
    };
    accessToken: string;
    user: DefaultSession['user'];
  }

  interface JWT {
    token?: { accessToken: string };
  }
}
