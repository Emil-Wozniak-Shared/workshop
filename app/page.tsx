"use client"
import {JSX} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";

const Index = (): JSX.Element => {
    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h2">Supabase Auth + Storage</Typography>
                <Typography paragraph>
                    Experience our Auth and Storage through a simple profile management example. Create a user
                    profile and upload an avatar image. Fast, simple, secure.
                </Typography>
                <Box>
                    <Button href="/login" variant="contained" color="warning" fullWidth>
                        <Typography variant="body1">You are not logged in</Typography>
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};
export default Index
