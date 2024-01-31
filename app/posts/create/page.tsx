import {v4 as uuid} from 'uuid'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Box, Button, TextField, Typography} from "@mui/material";
import Editor from "@/components/posts/Editor";

type Post = {
    "id": number,
    "user_id": string,
    "user_email": string,
    "title": string,
    "content": string,
    "inserted_at": string
}
const CreatePost = () => {
    const createNewPost = async (formData: FormData) => {
        "use server";
        const title = formData.get("title")
        const content = formData.get("content")
        const supabase = createServerComponentClient({cookies})
        if (!title || !content) return
        const {data: {user}} = await supabase.auth.getUser()
        if (user) {
            const {data, error} = await supabase
                .from('posts')
                .upsert([{title, content, user_id: user.id, user_email: user.email}])
                .select()
            if (!error) {
                console.error('Profile updated!')
            } else {
                
            }
            redirect(`/posts/${data![0].id}`)
        } else {
            redirect("/")
        }
    };

    return (
        <Box>
            <Typography>Create new post</Typography>
            <Box component="form" action={createNewPost}>
                <TextField
                    id="title"
                    name="title"
                    placeholder="Title"
                    sx={{mb: 2}}
                />
                <Typography variant="subtitle1">Content</Typography>
                <Editor/>
                <Button type="submit">Create Post</Button>
            </Box>
        </Box>
    )
};

export default CreatePost;