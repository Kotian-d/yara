export const authConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token and user id to the token right after sign-in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
  providers: [],
};
