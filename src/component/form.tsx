"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import RevalidatePath from "@/app/action"
// import { revalidateTagPost } from "@/app/aciton-tag"

export interface Post {
    userId: number,
    id: number,
    title: string
    body: string
}

export const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Omit<Post, "id" | "userId">>()

    const onSubmit: SubmitHandler<Omit<Post, "id" | "userId">> = async (data) => {
        const payload = { ...data, userId: 1 }
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error("Erreur lors de la création du post")
            }

            //You can uncomment one of them , it's depend on what behavior you want to revalidate the ISR page
            // await revalidateTagPost()
            await RevalidatePath()
            reset()
            console.log("Post envoyé :", data.title)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-md mx-auto p-4">
            <input
                {...register("title", {
                    required: "Le titre est obligatoire",
                    minLength: { value: 3, message: "Au moins 3 caractères" },
                })}
                type="text"
                placeholder="Votre titre"
                className="border rounded p-2"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

            <textarea
                {...register("body", { required: "Le contenu est obligatoire" })}
                placeholder="Votre contenu"
                className="border rounded p-2 min-h-[120px]"
            />
            {errors.body && <span className="text-red-500 text-sm">{errors.body.message}</span>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Envoi..." : "Publier"}
            </button>
        </form>
    )
}
