"use server";
import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type Authorization = {
    email: string;
    password: string
}

export const POST = async (request: Request) => {
    const json: Authorization = await request.json();
    const email = json.email;
    const password = json.password;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {error, data} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
        return redirect("/login?message=Could not authenticate user");
    }

    // URL to redirect to after sign in process completes
    return NextResponse.json(data);
};
