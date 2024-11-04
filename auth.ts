import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { prisma } from '@/lib/db';
import { getUserById } from '@/lib/user';
import authConfig from '@/auth.config';

import { TExtendedUser } from './shared/types/TUser';

// More info: https://authjs.dev/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  interface Session {
    user: TExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    // error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          // @see JWT type extension in `types/next-auth.d.ts`
          session.user.role = token.role;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const dbUser = await getUserById(token.sub);

      if (!dbUser) {
        return token;
      }

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
  // debug: process.env.NODE_ENV !== "production"
});
