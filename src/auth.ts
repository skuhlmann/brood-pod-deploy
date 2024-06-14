import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [{
    id: "alias", // signIn("alias") and will be part of the callback URL
    name: "Alias", // optional, used on the default login page as the button text.
    type: "oauth", // "oidc" for Open ID or "oauth" for OAuth 2 providers
    issuer: "http://localhost:4444", // to infer the .well-known/openid-configuration URL
    authorization: {
      url: 'http://localhost:4444/oauth2/auth',
      params: {
        scope: "offline profile", // include "openid" if using "oidc"
        redirect_uri: 'http://localhost:5000/api/auth/callback/alias'
      }
    }, //
    clientId: process.env.AUTH_CLIENT_ID, // from the provider's dashboard
    clientSecret: process.env.AUTH_CLIENT_SECRET, // from the provider's dashboard
    checks: ["pkce", "state"], // checks required by the provider
    wellKnown: "http://localhost:4444/.well-known/openid-configuration", // to get the issuer, authorization, token, and userinfo URLs
    token: {url: "http://localhost:4444/oauth2/token"}, // to get the access_token along with the id_token 
    userinfo: {url: "http://localhost:4444/userinfo"}, // to get the user profile
    profile(profile: any, tokens: any) {
      const token = tokens?.access_token || tokens?.id_token
      return {
        id: profile.id || token.id,
        name: profile.username || token.username,
        email: profile.email || token.email,
        wallet: profile.address || token.address,
      }
    }
  }],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: any) {
      console.log({ session, token })
      session.user = token.user as any
      return session
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log({ user, account, profile, email, credentials })
      return true
    }
  }
})