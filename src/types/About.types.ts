import type { Image } from "./Image.types";

export interface AboutSection {
    id?: number;
    images?: Image[];
    text: string;
}

export interface AboutProps {
    aboutSections: AboutSection[];
}
