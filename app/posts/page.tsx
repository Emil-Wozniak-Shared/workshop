// "use client"
import {FC} from 'react';
import {Box, Button, Grid, Link, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {postFrom} from "@/models/Post.model";
import {getPosts} from "@/app/db";
import {Session} from "next-auth";
import {auth} from "@/app/auth";

const Posts: FC = async () => {
    let session: Session | null = await auth();
    if (!session) {
        return (<div>Loading...</div>)
    }
    const values =  await getPosts(session!.user!.id! as any)
        .then(result => {
            console.log('posts' , result)
            return postFrom(result);
        })

    return (
        <Grid container>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <List aria-label="post list">

                    {values.map((post, id) => (
                        <ListItem key={`post-item-${id}`}>
                            <ListItemButton component={Link} href={`/posts/${post.id}`}>
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