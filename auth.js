import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { isValidUser, getUserFromDb } from "./app/queries/userquery";
import ConnectDB from "./app/db/connectDb";

export class CustomAuthError extends AuthError {
  constructor(msg) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      credentials: {
        mobile: {},
        password: {},
      },
      async authorize(credentials) {
        await ConnectDB();
        let user = null;

        //const { mobile, password } = await LoginSchema.parseAsync(credentials);
        const { mobile, password } = credentials;

        user = await getUserFromDb(mobile);

        if (!user) {
          throw new CustomAuthError("User not found.");
        }

        // logic to verify if the user exists
        const isvalid = await isValidUser(password, user.password);

        if (!isvalid) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new CustomAuthError("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
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
});
