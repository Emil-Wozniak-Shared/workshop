
import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query'
import {Post} from '@/models/Post.model'

type PostsResponse = Post[]

// maxRetries: 5 is the default, and can be omitted. Shown for documentation purposes.
const staggeredBaseQuery = retry(fetchBaseQuery({baseUrl: '/'}), {
    maxRetries: 5,
})
export const api = async () => createApi({
    baseQuery: staggeredBaseQuery,
    endpoints: (build) => ({
        getPosts: build.query<PostsResponse, void>({
            query: () => ({url: 'posts'}),
        }),
        getPost: build.query<PostsResponse, string>({
            query: (id) => ({url: `post/${id}`}),
            extraOptions: {maxRetries: 8}, // You can override the retry behavior on each endpoint
        }),
        createPost: build.query<PostsResponse, void>({
            query: () => ({url: `post/create`}),
        }),
    }),
})

