import {FC, JSX} from "react";
import {Box, Typography} from "@mui/material";

export const Gebish: FC = (): JSX.Element => (
    <Box sx={{marginTop: 2, display: "flex", flexDirection: "row", alignItems: "center"}}>
        <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: '50%'}}>
            <a href='http://www.gebish.org/manual/current/'>
                <img
                    alt="gebish image"
                    height={150}
                    width={250}
                    src='http://www.gebish.org/manual/current/images/logo.png'
                />
                <Typography paragraph>
                    The Book Of Geb
                </Typography>
            </a>
        </Box>
        <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: '50%'}}>
            <Typography paragraph>
                Everything you need
            </Typography>
            <Typography paragraph>
                to know about the geb
            </Typography>
        </Box>
    </Box>
);