import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Post} from "@/models/Post.model";
import Editor from "@/components/posts/Editor";

const supabase = createServerComponentClient({cookies})

const addPost = async (title: string, content: string) => {
    if (!title || !content) return
    const {data: {user}} = await supabase.auth.getUser()
    if (user) {
        // noinspection TypeScriptValidateJSTypes
        const {data, error} = await supabase
            .from('posts')
            .upsert([{title, content, user_id: user.id, user_email: user.email}])
            .select()
        if (!error) {
            const posts = data as Post[]
            console.info('Post created!', posts)
            redirect(`/posts/${posts![0].id}`)
        } else {
            console.error('Error', error)
        }
    } else {
        redirect("/")
    }
};

const CreatePost = () => {
    const createNewPost = async (formData: FormData) => {
        "use server";
        const title = formData.get("title") as string
        const content = formData.get("content") as string

        await addPost(title, content);
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