import {FC, JSX} from "react";
import {Box, List, ListItem, Typography} from "@mui/material";

export const SpockUpAndRunning: FC = (): JSX.Element => (
    <Box sx={{marginTop: 2, display: "flex", flexDirection: "row", alignItems: "center"}}>
        <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: '50%'}}>
            <a href='https://www.oreilly.com/library/view/spock-up-and/9781491923283/'>
                <img
                    alt="spock up and running image"
                    height={300}
                    width={250}
                    src='https://learning.oreilly.com/library/cover/9781491923283/250w/'
                />
                <Typography paragraph>
                    Spock: Up and Running
                </Typography>
            </a>
        </Box>
        <Box sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", width: '50%'}}>
            <List>
                <ListItem>Groovy</ListItem>
                <ListItem>Spock</ListItem>
                <ListItem>Geb</ListItem>
            </List>

        </Box>
    </Box>
);