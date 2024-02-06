import AccountForm from './account-form'
import {redirect} from "next/navigation";
import {auth, signOut} from "@/app/auth";
import {Session} from "next-auth";
import {Box, Button, Divider, Grid, TextField} from '@mui/material';

const Account = async () => {
    let session: Session | null = await auth();

    if (session) {
        return (
            <Grid container>
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <AccountForm session={session}/>
                    <Box component='form' sx={{width: '100%'}}>
                        <TextField
                            sx={{mb: 1}}
                            fullWidth
                            label='Name'
                            name='name'
                            value={session?.user?.name}
                        />
                        <TextField
                            sx={{mb: 1}}
                            fullWidth
                            label='Image'
                            name='image'
                            value={session?.user?.image}
                        />
                    </Box>
                    <Divider/>
                    <Box mb={2} sx={{width: '100%'}}
                         component='form'
                         action={async () => {
                             'use server';
                             await signOut();
                         }}
                    >
                    </Box>
                    <Button fullWidth type="submit">Sign out</Button>
                </Box>
            </Grid>
        )
    } else {
        redirect("/login")
    }
};
export default Account
