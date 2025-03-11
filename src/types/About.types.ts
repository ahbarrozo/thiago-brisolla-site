export interface AboutSection {
    id?: number;
    image?: string;
    text: string;
}

export interface AboutProps {
        aboutSections: AboutSection[];
    }
