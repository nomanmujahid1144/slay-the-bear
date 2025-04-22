import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")


export const signUpSchema = z.object({
    firstName: usernameValidation,
    lastName: usernameValidation,
    email: z.string().email({'message': 'Invalid email address'}),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})