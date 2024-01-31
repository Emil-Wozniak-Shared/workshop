"use client"
import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector, useAppStore} from "@/state/hooks";
import {getPosts, postAdded} from "@/state/features/posts/postSlice";
import {Box, Button, Grid} from "@mui/material";

const Page = () => {
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        store.dispatch(getPosts)
        initialized.current = true
    }
    const posts = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()
    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                {posts.posts.map(post =>
                    <li>{post.title}</li>
                )}
                <Button onClick={() => {
                    dispatch(postAdded({id: "string", title: "string", content: "string"}))
                }}>add</Button>
            </Box>
        </Grid>
    );
};

export default Page;