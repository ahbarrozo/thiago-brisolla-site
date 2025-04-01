import type { Image } from "./Image.types";

export interface Work {
    id?: number;
    date: string;
    description: string;
    images: Image[];
    title: string;
}

export interface WorksProps {
    works: Work[];
}
