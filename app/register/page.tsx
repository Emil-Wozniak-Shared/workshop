import Link from 'next/link';
import {redirect} from 'next/navigation';
import {createUser, getUser} from '@/app/db';
import {Form} from "@/components/form";
import {SubmitButton} from "@/components/submit-button";
import {JSX} from "react";
import {Box, Grid, Typography} from "@mui/material";

const Register = (): JSX.Element => {
    const register = async (formData: FormData) => {
        'use server';
        let email = formData.get('email') as string;
        let password = formData.get('password') as string;
        let user = await getUser(email);

        if (user.length > 0) {
            return 'User already exists'; // TODO: Handle errors with useFormStatus
        } else {
            await createUser(email, password);
            redirect('/login');
        }
    };

    return (
        <Grid container sx={{
            height: 'full'
        }} className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>

                <Typography
                    variant='h3'
                    sx={{
                        fontSize: '1.25rem', /* 20px */
                        lineHeight: '1.75rem', /* 28px */
                        fontWeight: 'bold'
                    }}
                    className="text-xl font-semibold">Sign Up</Typography>
                <Typography paragraph sx={{
                    color: 'rgb(107 114 128)',
                    fontSize: '0.875rem', /* 14px */
                    lineHeight: '1.25rem', /* 20px */
                }}>
                    Create an account with your email and password
                </Typography>

                <Form action={register}>
                    <SubmitButton>Sign Up</SubmitButton>
                    <Typography my={2} paragraph sx={{
                        color: 'rgb(107 114 128)',
                        fontSize: '0.875rem', /* 14px */
                        lineHeight: '1.25rem', /* 20px */
                    }}>
                        {'Already have an account? '}
                        <Link href="/login" className="font-semibold text-gray-800">
                            Sign in
                        </Link>
                        {' instead.'}
                    </Typography>
                </Form>
            </Box>
        </Grid>
    );
};
export default Register
