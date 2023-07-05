import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@lib/prisma';

interface SessionUser {
    name: string | undefined;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "your account",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: credentials?.username, 
                    password: credentials?.password
                }),
            })

            const user = await res.json();
            console.log(user);

            // const databaseUser = await prisma.admin.findFirst({
            //     where: {
            //         username: credentials?.username
            //     }
            // })

            // const user: SessionUser = {
            //     name: databaseUser?.username,
            // }

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                // console.log(JSON.stringify(user));
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                console.log("No user");
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // })
    ],
    callbacks: {
        // async session({ session, user }){
        //     session.user.name = user.name;
        //     return session;
        // }
    }
})

export { handler as GET, handler as POST }
