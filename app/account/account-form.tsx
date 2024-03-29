"use client"
import {FC, JSX} from 'react'
import {Session} from "next-auth";
import {Box, Typography} from "@mui/material";
import {useAppDispatch} from "@/state/hooks";
import {setAuthState} from "@/state/features/user/authSlice";
import {setUserState} from "@/state/features/user/userSlice";

type Props = { session: Session | null }

const AccountForm: FC<Props> = ({session}): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(setUserState({...session?.user}))
    dispatch(setAuthState(true))
    return (
        <Box my={2} sx={{width: '100%'}}>
            <Typography sx={{mb: 1}}>
                You are logged in as <b>{session?.user?.email}</b>
            </Typography>
        </Box>
    );
}


export default AccountForm