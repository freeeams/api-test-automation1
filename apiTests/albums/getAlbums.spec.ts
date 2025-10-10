
import { test,} from '@playwright/test'
import z from 'zod';

const albumSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string()
});
const baseURL = process.env.baseURL;
test('Get all albums', async ({ request }) => {
    const response = await request.get(`${baseURL}/albums`);
    const status = response.status();
    const responseJSON = await response.json();
    console.log(responseJSON[0].title);
    console.log(responseJSON.length);
    for (let i = 0; i < responseJSON.length; i++) {
        albumSchema.parse(responseJSON[i]);
    }
});


test('Get an album with id', async ({ request }) => {
    const getAllAlbumsResponse = await request.get(`${baseURL}/albums`)
    const getAllAlbumsResponseJSON = await getAllAlbumsResponse.json()
    const albumId = getAllAlbumsResponseJSON[0].id;
    const getAlbumResponse = await request.get(`${baseURL}/albums/${albumId}`)
    const getAlbumResponseJSON = await getAlbumResponse.json()
    albumSchema.parse(getAlbumResponseJSON);
});

//++