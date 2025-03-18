import type { ServerLoad } from '@sveltejs/kit';
import type { ApiData, PageData } from 'src/types/PageData.types';

import { API_ENDPOINT } from '$env/static/private';

type DataTableName = keyof ApiData;

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
