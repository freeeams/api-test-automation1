import { test, expect } from '@playwright/test'
import z from 'zod';

const userSchema = z.object({
    userId: z.number().min(0),
    id: z.number().min(0),
    title: z.string(),
    body: z.string(),
});
const baseURL = process.env.baseURL;
test('Get post with dynamic id', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/posts?userId=${userId}`);
    const status = response.status();
    const responseJSON = await response.json();
    expect(status).toBe(200);

    for (let i = 0; i < responseJSON.length; i++) {
        userSchema.parse(responseJSON[i]);
    }
}); 
