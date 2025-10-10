import { test, expect } from '@playwright/test'
import z from 'zod';
const postSchema = z.object({
    userId: z.number().min(0),
    id: z.number().min(0),
    title: z.string(),
    body: z.string(),
})

const baseURL=process.env.baseURL;
test('Get all users',async({request})=>{
    const response=await request.get(`${baseURL}/api/users`);
    const status=response.status();
    const responseJSON=await response.json();
    console.log(responseJSON[0].name);
    console.log(responseJSON.length);   
     for(let i=0;i<responseJSON.length;i++){
        console.log(`User ${i}: ${responseJSON[i].name}`);
    }
});

test('Get all users and validate first user details',async({request})=>{
const getAllUsersResponse=await request.get(`${baseURL}/users`)
const getAllUsersResponseJSON=await getAllUsersResponse.json()
const firstUserId=getAllUsersResponseJSON[0].id;    
const userResponse=await request.get(`${baseURL}/users/${firstUserId}`)
const userResponseJSON=await userResponse.json()
postSchema.parse(userResponseJSON);
})

