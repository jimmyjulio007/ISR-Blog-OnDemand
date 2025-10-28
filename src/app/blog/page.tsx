import { Form, type Post } from "@/component/form"

export const revalidate = 3600

export default async function Page() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: { tags: ['posts'], revalidate: 3600 },
    })
    const posts: Post[] = await data.json()

    return (
        <main>
            <h1>Blog Posts</h1>
            <Form />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </main>
    )
}