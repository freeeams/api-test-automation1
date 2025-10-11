import { test, expect } from '@playwright/test'
import z from 'zod';
const userSchema = z.object({
    id: z.number().min(0),
    name: z.string(),
    email: z.string(),
}); 

const baseURL=process.env.baseURL;
test('Get all users',async({request})=>{
    const response=await request.get(`${baseURL}/users`);
    const status=response.status();
    const responseJSON=await response.json();
   for(let i=0;i<responseJSON.length;i++){
    expect(status).toBe(200);
   }
});

test('Get all users and validate first user details',async({request})=>{
const getAllUsersResponse=await request.get(`${baseURL}/users`)
const getAllUsersResponseJSON=await getAllUsersResponse.json()
const firstUserId=getAllUsersResponseJSON[0].id;    
const userResponse=await request.get(`${baseURL}/users/${firstUserId}`)
const userResponseJSON=await userResponse.json()
userSchema.parse(userResponseJSON);
expect(userResponse.status()).toBe(200);
})

