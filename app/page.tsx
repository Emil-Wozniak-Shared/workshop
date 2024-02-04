"use client"
import {FC, JSX, useRef} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useAppSelector} from "@/state/hooks";
import {SpockUpAndRunning} from "@/components/SpockUpAndRunning";
import {Gebish} from "@/components/Gebish";
import {AuthState} from "@/state/features/user/userSlice";

const Index: FC = (): JSX.Element => {
    const initialized = useRef(false)
    if (!initialized.current) {
        initialized.current = true
    }
    const user: AuthState = useAppSelector(state => state.user)

    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h2">
                    E2E with Geb - workshop
                </Typography>

                <SpockUpAndRunning/>
                <Gebish/>

                {!user.authenticated && (
                    <Box>
                        <Button href="/login" variant="contained" color="warning" fullWidth>
                            <Typography variant="body1">You are not logged in</Typography>
                        </Button>
                    </Box>
                )}
            </Box>
        </Grid>
    );
};
export default Index
