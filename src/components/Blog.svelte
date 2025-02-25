<script lang="ts">
	import BlogPost from './BlogPost.svelte';
    import { type BlogPostProps } from '../types/BlogPost.types';

    interface BlogProps {
        blogPosts: BlogPostProps[];
    }

    const POSTS_PER_PAGE = 9;

    const { blogPosts }: BlogProps = $props();
    blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let currentPage = $state(1);
    let firstPost = $derived((currentPage - 1) * POSTS_PER_PAGE);
    let displayedPosts = $derived(blogPosts.slice(firstPost, firstPost + POSTS_PER_PAGE));
    const numPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);

</script>
<div class="flex flex-wrap gap-x-8 gap-y-4 mb-10">
    {#each displayedPosts as post }
        <BlogPost {...post}></BlogPost> 
    {/each}
</div>
<div class="join">
    {#each pages as page}
        <input class="join-item btn btn-square"
               type="radio"
               name="options"
               value={page}
               aria-label={`${page}`}
               checked={page === currentPage}
               bind:group={currentPage} />
    {/each}
</div>

