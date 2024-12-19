import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_.-]{3,20}$/, "Username must not contain special characters")


export const updateUserSchema = z.object({
    firstName: usernameValidation,
    lastName: usernameValidation,
})