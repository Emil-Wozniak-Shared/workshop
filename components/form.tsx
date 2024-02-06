import {FC} from "react";
import {Box, TextField} from "@mui/material";

type Props = {
    action: any;
    children: React.ReactNode;
}

export const Form: FC<Props> = ({action, children}) => (
    <Box
        component="form"
        action={action}
    >
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

        {children}
    </Box>
);