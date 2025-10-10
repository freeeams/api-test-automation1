import { test, } from '@playwright/test'
import z from 'zod';

   const todosSchema = z.object({
    "userId": z.number().min(0),
    "id": z.number().min(0),
    "title": z.string(),
    "completed": z.boolean()            
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