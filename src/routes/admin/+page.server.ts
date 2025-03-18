import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import type { ApiData, PageData } from 'src/types/PageData.types';

import { API_ENDPOINT } from '$env/static/private';

type DataTableName = keyof ApiData;

export const actions: Actions = {
    deleteAboutSection: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `about_sections/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },  
    deleteAlbum: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIzMTQwMjgsImV4cCI6MTc0MjQwMDQyOH0.FdX2eenT61YORAPLjwh3Xyg-uPlUMkPEZQ-vEbhmpU4";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `albums/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
 
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },   
    deleteBlogPost: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `blog_posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
 
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    saveAboutSection: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const response = await fetch(API_ENDPOINT + 'about_sections', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
 
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    saveAlbum: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIzMTQwMjgsImV4cCI6MTc0MjQwMDQyOH0.FdX2eenT61YORAPLjwh3Xyg-uPlUMkPEZQ-vEbhmpU4";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const response = await fetch(API_ENDPOINT + 'albums', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    saveBlogPost: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const response = await fetch(API_ENDPOINT + 'blog_posts', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    updateAboutSection: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `about_sections/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
 
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    updateAlbum: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIzMTQwMjgsImV4cCI6MTc0MjQwMDQyOH0.FdX2eenT61YORAPLjwh3Xyg-uPlUMkPEZQ-vEbhmpU4";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `albums/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    updateBlogPost: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            let token = cookies.get('token');

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb2JyaXNvbGxhNEBnbWFpbC5jb20iLCJpYXQiOjE3NDIyMTA4MTcsImV4cCI6MTc0MjI5NzIxN30.XdruXV-y2gpIfsKrz97HoMq5Czpe1kLkCAUhTDra2go";

            if (!token) {
                return { success: false, error: 'Unauthroized: no token found'};
            }

            const id = formData.get('id');
            const response = await fetch(API_ENDPOINT + `blog_posts/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();
            if (result.error)
                // @ts-ignore
                return fail(400, 'Invalid or expired token')
            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
};

export const load: ServerLoad = async ({ fetch }): Promise<PageData> => {
    try {
        const dataTables: DataTableName[] = [
            'albums',
            'about_sections', 
            'blog_posts', 
            'contacts', 
            'events', 
            'social_media'
        ];

        // Create an array of promise-returning API call functions
        const apiCalls = dataTables.map(dt => fetch(API_ENDPOINT + dt));
    
        // Wait for all promises to resolve
        const responses = await Promise.all(apiCalls);
    
        // Process all responses
        const results = await Promise.all(responses.map(response => response.json()));
        const apiData: ApiData = dataTables.reduce((acc: ApiData, table: DataTableName, i) => {
            acc[table] = results[i];
            return acc;
        }, {} as ApiData);

        return {
            apiData
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
