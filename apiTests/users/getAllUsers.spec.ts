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


