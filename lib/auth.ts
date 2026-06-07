import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const MOCK_USERS = [
  { id: '1', name: 'Demo User', email: 'demo@saintara.id', password: 'demo1234' },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = MOCK_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )
        if (user) return { id: user.id, name: user.name, email: user.email }
        return null
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) (session.user as { id?: string }).id = token.id as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'saintara-secret-phase1-2024',
}
