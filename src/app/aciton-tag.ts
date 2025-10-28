'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateTagPost() {
    console.log("Revalidation du tag 'blog'")
    revalidateTag('posts', 'max')
}