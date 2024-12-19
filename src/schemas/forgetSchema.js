import { z } from 'zod';

export const forgetSchema = z.object({
    email: z.string().email({'message': 'Invalid email address'}),
})