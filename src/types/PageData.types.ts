import { type AboutSection } from './About.types';
import type { Work } from './Work.types';
import { type BlogPostProps } from './BlogPost.types';
import { type Contact } from './Contact.types';
import { type Event } from './Event.types';
import { type SocialMedia } from './SocialMedia.types';

export interface ApiData {
    about_sections: AboutSection[],
    blog_posts: BlogPostProps[], 
    contacts: Contact[], 
    events: Event[], 
    social_media: SocialMedia[],
    works: Work[],
}

export interface PageData {
    apiData: ApiData
}
