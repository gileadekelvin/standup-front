import { withAuth } from 'next-auth/middleware';

export default withAuth({
  jwt: {
    decode: ({ token }) => {
      return token as any;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export const config = { matcher: ['/', '/settings', '/invite'] };
