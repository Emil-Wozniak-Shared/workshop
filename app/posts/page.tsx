"use client"
import {FC, JSX, useEffect, useState} from 'react';
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Post} from "@/models/Post.model";
import Link from "next/link";

const Posts: FC = (): JSX.Element => {
    const [posts, setPosts] = useState<Post[]>([])
    const supabase = createClientComponentClient()

    const setup = async () => {
        const {data: {user}, error} = await supabase.auth.getUser();
        const {data} = await supabase.from("posts").select('*') //.eq("user_id", user!.id!);
        setPosts(data as Post[])
    };

    useEffect(() => {
        setup()
    }, []);
    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <List aria-label="post list">
                    {posts.map((post, id) => (
                        <ListItem key={`post-item-${id}`}>
                            <ListItemButton
                                component={Link}
                                href={`/posts/${post.id}`}
                            >
                                <ListItemText primary={post.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" href="/posts/create">Create</Button>
            </Box>
        </Grid>
    );
};

export default Posts;