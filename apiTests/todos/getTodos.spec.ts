import { test, } from '@playwright/test'
import z from 'zod';

const todosSchema = z.object({
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
test('Get all todos', async ({ request }) => {
    const response = await request.get(`${baseURL}/todos`);
    const status = response.status();
    const responseJSON = await response.json();
    console.log(responseJSON[0].title);
    console.log(responseJSON.length);
    for (let i = 0; i < responseJSON.length; i++) {
        todosSchema.parse(responseJSON[i]);
    }
});

test('Get a todo with id', async ({ request }) => {
    const getAllTodosResponse = await request.get(`${baseURL}/todos`)
    const getAllTodosResponseJSON = await getAllTodosResponse.json()
    const todoId = getAllTodosResponseJSON[0].id;
    const getTodoResponse = await request.get(`${baseURL}/todos/${todoId}`)
    const getTodoResponseJSON = await getTodoResponse.json()
    todosSchema.parse(getTodoResponseJSON);
});