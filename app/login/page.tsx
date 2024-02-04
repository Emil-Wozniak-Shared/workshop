import Link from "next/link";
import {cookies, headers} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {Alert, Box, Button, Grid, TextField, Typography} from "@mui/material";
import {FC} from "react";

type Props = {
    searchParams: { message: string }
}

const Login: FC<Props> = ({searchParams}) => {
    const signIn = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/account");
    };

    const signUp = async (formData: FormData) => {
        "use server";
        console.log(formData)
        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
            throw Error("field is empty")
        }
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Link href="/">
                    <Typography paragraph sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: `center`,
                        width: `100%`,
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Back
                    </Typography>
                </Link>
                <Box component="form" action={signIn}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        required
                        focused
                        sx={{mb: 2}}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        required
                        focused
                        sx={{mb: 2}}
                    />
                    <Button type="submit" aria-label="submit" variant="contained" sx={{mr: 1}}>
                        Sign In
                    </Button>
                    <Button type="submit" formAction={signUp} variant="contained">
                        Sign Up
                    </Button>
                    {searchParams?.message && (
                        <Alert color="error">
                            {searchParams.message}
                        </Alert>
                    )}
                </Box>
            </Box>
        </Grid>
    );
};
export default Login
