import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import postgres from 'postgres';

// see https://github.com/vercel/nextjs-postgres-auth-starter
// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const url = `${process.env.POSTGRES_URL!}?sslmode=require`;

// see https://api.elephantsql.com/console/663d6e37-c108-458a-8a73-fda326af84be/details
let client = postgres(url);
let db = drizzle(client);

let users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 64 }),
    name: varchar('name', { length: 64 }),
    image: varchar('image', { length: 255 }),
    password: varchar('password', { length: 64 }),
});

export const getUser = async (email: string) =>
    await db.select().from(users).where(eq(users.email, email));

export const createUser = async (email: string, password: string) => {
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    return await db.insert(users).values({ email, password: hash });
};

export const updateUser = async (id: any, name: string, image: string) => {
    await db.update(users).set({
        name: name,
        image: image
    }).where(eq(users.id, id))
}