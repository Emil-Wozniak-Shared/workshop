import {drizzle} from 'drizzle-orm/postgres-js';
import {bigint, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core';
import {eq} from 'drizzle-orm';
import {genSaltSync, hashSync} from 'bcrypt-ts';
import postgres from 'postgres';

// see https://github.com/vercel/nextjs-postgres-auth-starter
// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const url = `${process.env.DATABASE_URL}`;

// see https://api.elephantsql.com/console/663d6e37-c108-458a-8a73-fda326af84be/details
let client = postgres(url, {
    transform: {
        undefined: null
    }
});
let db = drizzle(client);

let users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', {length: 64}),
    name: varchar('name', {length: 64}),
    image: varchar('image', {length: 255}),
    password: varchar('password', {length: 64}),
});

let posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    userId: bigint('user_id', {mode: "number"}),
    userEmail: text('user_email'),
    title: text('title'),
    content: text('content'),
    insertedAt: timestamp('inserted_at'),
});

export const getUser = async (email: string) =>
    await db.select().from(users).where(eq(users.email, email));

export const createUser = async (email: string, password: string) => {
    let salt: string = genSaltSync(10);
    let hash: string = hashSync(password, salt);

    return await db.insert(users).values({email, password: hash});
};

export const getPosts = async (userId: number) => {
    return db
        .select()
        .from(posts)
        .where(eq(posts.userId, userId));
}

export const updateUser = async (id: any, name: string, image: string) => {
    await db.update(users).set({
        name: name,
        image: image
    }).where(eq(users.id, id))
}