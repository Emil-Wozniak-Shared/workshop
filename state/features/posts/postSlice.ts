import {createSlice} from "@reduxjs/toolkit";

type Post = { id: string, title: string, content: string }

interface PostState {
    posts: Post[]
}

export const initialState: PostState = {posts: []}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts(state, action) {
            state.posts
        },
        postAdded(state, action) {
            state.posts.push(action.payload)
        },
        postUpdated(state, action) {
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const {postAdded, postUpdated, getPosts} = postsSlice.actions

export default postsSlice.reducer