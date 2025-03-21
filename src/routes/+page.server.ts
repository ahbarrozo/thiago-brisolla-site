import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import type { ApiData, PageData } from 'src/types/PageData.types';

import { API_ENDPOINT } from '$env/static/private';

type DataTableName = keyof ApiData;

export const actions: Actions = {
    authenticate: async ({ request, cookies, fetch }) => {
        try {
            const formData = await request.formData();
            const response = await fetch(API_ENDPOINT + `auth/login`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.error)
                // @ts-ignore
                return fail(400, 'Authentication failed');

            cookies.set('token', result.token, { path: '/' });

            return { success: true, data: result };
        } catch (error) {
            return fail(500, { success: false, error });
        }
    },
    verifyToken: async ({ cookies, fetch }) => {
        const token = cookies.get('token');
        if (!token) {
            cookies.delete('token', { path: '/' });
            return { success: false };
        }

        const formData = new FormData();
        formData.append('token', token);
        const response = await fetch(API_ENDPOINT + 'auth/verify_token',
            {
                method: 'POST',
                body: formData 
            }
        );
        const responseData = await response.json();

        if (responseData.error) {
            cookies.delete('token', { path: '/' });
            return { success: false };
        }

        redirect(303, '/admin');
    }
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
