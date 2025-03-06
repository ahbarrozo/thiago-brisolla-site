export interface Album {
    id?: number;
    date: string;
    description: string;
    image?: string;
    title: string;
}

export interface DiscographyProps {
    albums: Album[];
}
