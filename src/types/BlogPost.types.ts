import type { Image } from "./Image.types";

export interface BlogPostProps {
  id?: number;
  date: string;
  title: string;
  subtitle?: string;
  text: string;
  images?: Image[];
  isFirst?: boolean;
}
