import { test, expect } from '@playwright/test'
import z from 'zod';

const userSchema = z.object({
    id: z.number().min(0),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
            lat: z.string(),
            lng: z.string()
        })
    }),
    phone: z.string(),
    website: z.string(),
    company: z.object({
        name: z.string(),
        catchPhrase: z.string(),
        bs: z.string()
    })
});

const baseURL = process.env.baseURL;

test('Get all users and validate first user details', async ({ request }) => {
    const getAllUsersResponse = await request.get(`${baseURL}/users`)
    const getAllUsersResponseJSON = await getAllUsersResponse.json()
    const firstUserId = getAllUsersResponseJSON[0].id;

    
    const userResponse = await request.get(`${baseURL}/users/${firstUserId}`)
    const userResponseJSON = await userResponse.json()
    userSchema.parse(userResponseJSON);
})

test('get all comments from a post with post id call', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts/1/comments`);
    const getAllPostsAndIdAndComments = await response.json();
    const getAllComments = await response.json();
    const status = response.status();
    expect(status).toBe(200);
    for (let i = 0; i < getAllComments.length; i++) {
     userSchema.parse(getAllComments[i]);
    }
});