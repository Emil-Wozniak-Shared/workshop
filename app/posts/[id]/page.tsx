"use client"
import {FC, useEffect, useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {useParams} from "next/navigation";
import {Post} from "@/models/Post.model";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import MdBlock from "@/components/markdown/MDBlock";

const Page: FC = (): JSX.Element => {
    const params = useParams();
    const id = params.id;
    const [post, setPost] = useState<Post | null>(null)
    const supabase = createClientComponentClient()
    const setup = async () => {
        const {data: {user}, error} = await supabase.auth.getUser();
        const {data} = await supabase.from("posts").select('*').eq("id", id).single();
        setPost(data as Post)
    };

    useEffect(() => {
        setup()
    }, []);
    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography>Post {id}</Typography>
                {post && (
                    <>
                        <Typography variant="h3">
                            {post.title}
                        </Typography>
                        <Typography variant="body1">
                            {post.content &&
                                <MdBlock source={post.content}/>
                            }
                        </Typography>
                    </>
                )}
            </Box>
        </Grid>
    );
};

export default Page;