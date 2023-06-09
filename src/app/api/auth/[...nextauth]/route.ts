import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import _mongo from "@/lib/mongoDB/_mongo";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "password",
      name: "A Test Account",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = { id: "1", name: "J Smith", email: "test_user@example.com" };
        if (credentials?.email == user.email && credentials.password == "test_password") {
          return user;
        } else {
          return null;
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("");
      // console.log("Callback: signIn");
      // console.log({ user, account, profile, email, credentials });
      if (typeof user.email == "string" && account && account.provider) {
        const u = await _mongo.user.retrieveUser(user.email, account.provider);
        if (u == null) {
          const name = user.name === null || user.name === undefined ? "" : user.name;
          const image = user.image === null || user.image === undefined ? "" : user.image;
          await _mongo.user.createUser(user.email, account.provider, name, image);
          // console.log("User Created");
        }
        // else {
        //   console.log("User Found", u);
        // }
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // console.log("");
      // console.log("Callback: redirect");
      // console.log({ url, baseUrl });
      return baseUrl;
    },
    async session({ session, token, user }) {
      // console.log("");
      // console.log("Callback: session");
      // console.log({ session, token, user });
      if (token.provider) {
        const newSession = { ...session };
        newSession.user.provider = token.provider as string;
        return newSession;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("");
      // console.log("Callback: jwt");
      // console.log({ token, user, account, profile });
      if (account?.provider) {
        return {
          ...token,
          provider: account.provider,
        };
      }
      return token;
    },
  },
  // events: {
  //   async signIn(message) {
  //     console.log("");
  //     console.log("Events: signIn");
  //     console.log(message);
  //   },
  //   async signOut(message) {
  //     console.log("");
  //     console.log("Events: signOut");
  //     console.log(message);
  //   },
  //   async createUser(message) {
  //     console.log("");
  //     console.log("Events: createUser");
  //     console.log(message);
  //   },
  //   async updateUser(message) {
  //     console.log("");
  //     console.log("Events: updateUser");
  //     console.log(message);
  //   },
  //   async linkAccount(message) {
  //     console.log("");
  //     console.log("Events: linkAccount");
  //     console.log(message);
  //   },
  //   async session(message) {
  //     console.log("");
  //     console.log("Events: session");
  //     console.log(message);
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
