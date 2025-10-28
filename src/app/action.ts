'use server'

import { revalidatePath } from 'next/cache'

export default async function RevalidatePath() {
    console.log("Revalidation du path '/posts'")
    revalidatePath('/blog')
}