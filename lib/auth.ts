import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Missing credentials');
          }


          const response = await fetch(`${baseUrl}/find-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
            }),
          });


          if (!response.ok) {
            return null;
          }

          const user = await response.json();


          const isValidPassword = await verifyPassword(credentials.password, user.password);

          if (!isValidPassword) {
            return null; 
          }

         
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
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

async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}