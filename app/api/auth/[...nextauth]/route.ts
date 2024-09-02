
import NextAuth,{AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import { NextAuthOptions } from 'next-auth';

export const authOptions: AuthOptions= {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;

        const response = await fetch(`${baseUrl}/find-user`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const user = await response.json();
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




