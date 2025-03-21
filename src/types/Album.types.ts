import type { Image } from "./Image.types";

export interface Album {
    id?: number;
    date: string;
    description: string;
    images: Image[];
    title: string;
}

export interface DiscographyProps {
    albums: Album[];
}
