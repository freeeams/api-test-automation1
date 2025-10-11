import {test,expect,} from '@playwright/test'
import z from 'zod';

const postSchema = z.object({
    userId: z.number().min(0),
    id: z.number().min(0),
    title: z.string(),
    body: z.string(),
});

const baseURL = process.env.baseURL;

test('Get posts for specific user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/posts?userId=${userId}`);
    const status = response.status();
    const responseJSON = await response.json();
    expect(status).toBe(200);

    for (let i = 0; i < responseJSON.length; i++) {
        postSchema.parse(responseJSON[i]);
    }
});

test('Create a new post', async ({ request }) => {
    const newPostRequestBody = {
        "userId": 1,
        "title": "delectus aut autem",
        "body": "quis ut nam facilis et officia qui"
    }
    const response = await request.post(`${baseURL}/posts`, { data: newPostRequestBody });
    expect(response.status()).toBe(201)
    const expectedResponseSchema = z.object({
        userId: z.literal(newPostRequestBody.userId),
        id: z.number().positive(),
        title: z.literal(newPostRequestBody.title),
        body: z.literal(newPostRequestBody.body)
    });
    const actualResponseJSON = await response.json()
    expectedResponseSchema.parse(actualResponseJSON);
});
