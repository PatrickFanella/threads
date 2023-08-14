import * as z from 'zod'

export const userValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, 'minimum 3 char').max(30).nonempty(),
    bio: z.string().min(3).max(1000).nonempty(),
})