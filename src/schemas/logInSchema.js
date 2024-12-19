import { z } from 'zod';

export const logInSchema = z.object({
    email: z.string().email({'message': 'Invalid email address'}),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})