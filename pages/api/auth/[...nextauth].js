import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read,user-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
})
