import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {Box, CssBaseline, Toolbar} from "@mui/material";
import {Metadata} from "next";
import {ReactNode} from "react";
import Navbar from "@/components/ui/Navbar";
import StoreProvider from "@/components/redux/StoreProvider";

const defaultUrl: string = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Geb workshop",
    description: "The fastest way to build apps with Next.js and Supabase",
};

type Props = {
    children: ReactNode
}

const RootLayout = ({children,}: Props) => {
    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider>
            <StoreProvider>
                <main>
                    <Box sx={{display: 'flex'}}>
                        <CssBaseline/>
                        <Navbar/>
                        <Box sx={{p: 3, m: "auto"}}>
                            <Toolbar/>
                            {children}
                        </Box>
                    </Box>
                </main>
            </StoreProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
};
export default RootLayout
