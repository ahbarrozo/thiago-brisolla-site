export interface BlogPostImage {
    description?: string;
    path: string;
    title?: string;
}

export interface BlogPostProps {
  id: number;
  date: string;
  title: string;
  subtitle?: string;
  text: string;
  images?: BlogPostImage[];
  isFirst?: boolean;
}
