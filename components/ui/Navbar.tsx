"use client"
import * as React from 'react';
import {FC, JSX, useRef} from 'react';
import {useAppStore} from "@/state/hooks";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "next/link";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;

type ItemModel = {
    name: string;
    path: string;
}

const navItems: ItemModel[] = [
    {name: 'Home', path: "/"},
    {name: 'Posts', path: "/posts"},
    {name: 'Login', path: "/login"},
    {name: 'Account', path: "/account"},
];

const Items = ({authenticated}: { authenticated: boolean }) => navItems
    .filter(item => {
        if (authenticated) {
            return !item.path.includes('login')
        }
        return !item.path.includes('account') && !item.path.includes('posts')
    })
    .map(({name, path}) => (
        <Button
            aria-label={`button ${name}`}
            href={path}
            component={Link}
            key={name}
            sx={{color: '#fff'}}
        >
            {name}
        </Button>
    ));

const Navbar: FC<Props> = (props): JSX.Element => {
    const {window} = props;
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        initialized.current = true
    }
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const auth = {authenticated: true}
    //     = useAppSelector(state => {
    //     return state.auth;
    // });

    const drawer: JSX.Element = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}} aria-label='title'>
                E2E with Geb
            </Typography>
            <Divider/>
            <List>
                <Items authenticated={auth.authenticated}/>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        aria-label='title'
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        E2E with Geb
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Items authenticated={auth.authenticated}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{keepMounted: true, /* Better open performance on mobile. */}}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </>
    );

};
export default Navbar
