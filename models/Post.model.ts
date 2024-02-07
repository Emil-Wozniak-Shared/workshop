export type Post = {
    id: number | null,
    user_id: number | null,
    user_email: string | null,
    title: string | null,
    content: string | null,
    inserted_at: Date | null
}

export const postFrom = (
    result: {
        id: number | null,
        title: string | null,
        content: string | null,
        userId: number | null,
        userEmail: string | null,
        insertedAt: Date | null
    }[]
) => {
    if (!result  || result === undefined) return []
    return result
        .map((post) => ({
                id: post.id,
                user_id: post.userId,
                user_email: post.userEmail,
                title: post.title,
                content: post.content,
                inserted_at: post.insertedAt
            } as Post)
        );
}