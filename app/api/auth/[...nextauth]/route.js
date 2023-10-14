import { connectMongoDB } from "@/lib/mongobd";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				try {
					await connectMongoDB();
					const user = await User.findOne({ email });

					if (!user) {
						return null;
					}
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (!passwordsMatch) {
						return null;
					}

					return user;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async session({ session, token }) {
			session.user.fName = token.fName;
			session.user.lName = token.lName;
			return session;
		},
		async jwt({ token, account, user }) {
			if (account) {
				token.fName = user.fName;
				token.lName = user.lName;
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
