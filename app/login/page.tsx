import Link from "next/link";
import {Box, Grid, Typography} from "@mui/material";
import {FC} from "react";
import {signIn} from "@/app/auth";
import {SubmitButton} from "@/components/submit-button";
import {Form} from "@/components/form";

type Props = {
    searchParams: { message: string }
}

const Login: FC<Props> = ({searchParams}) => {
    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography
                    variant='h3'
                    sx={{
                        fontSize: '1.25rem', /* 20px */
                        lineHeight: '1.75rem', /* 28px */
                        fontWeight: 'bold'
                    }}
                    className="text-xl font-semibold">Sign In</Typography>
                <Typography paragraph sx={{
                    color: 'rgb(107 114 128)',
                    fontSize: '0.875rem', /* 14px */
                    lineHeight: '1.25rem', /* 20px */
                }}>
                    Use your email and password to sign in
                </Typography>
                <Form
                    action={async (formData: FormData) => {
                        'use server';
                        await signIn('credentials', {
                            redirectTo: '/account',
                            email: formData.get('email') as string,
                            password: formData.get('password') as string,
                        });
                    }}
                >
                    <SubmitButton>Sign in</SubmitButton>
                    <Typography my={2} paragraph sx={{
                        textAlign: 'center',
                        color: 'rgb(107 114 128)',
                        fontSize: '0.875rem', /* 14px */
                        lineHeight: '1.25rem', /* 20px */
                    }}>
                        {"Don't have an account? "}
                        <Link href="/register" className="font-semibold text-gray-800">
                            Sign up
                        </Link>
                        {' for free.'}
                    </Typography>
                </Form>
            </Box>
        </Grid>
    );
};
export default Login
