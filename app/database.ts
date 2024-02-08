import {neon} from '@neondatabase/serverless';

// client side
export async function registerUser(email: string, password: string) {
    const url = await process.env.DATABASE_URL!;
    const sql = await neon(url);
    console.log(url)
    let res = await sql`
        SELECT *
        FROM public.users;`
    console.log(res)
    const response = await sql`
        INSERT INTO public.users (email, password)
        values (${email}, ${password})`;

    console.log(response);
    return response;
}

// server side
export async function getServerSideProps(email: string, password: string) {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`
        INSERT INTO users (email, password)
        values (${email}, ${password})`;

    console.log(response);

    return {props: {data: response}};
}

