<script lang="ts">
    import { type BlogPostProps } from 'src/types/BlogPost.types';
    import BlogPostAdmin from './BlogPostAdmin.svelte';

    interface BlogProps {
        blogPosts: BlogPostProps[];
    }

    const POSTS_PER_PAGE = 6;

    const { blogPosts }: BlogProps = $props();

    let currentPage = $state(1);
    let firstPost = $derived((currentPage - 1) * POSTS_PER_PAGE);
    let displayedPosts = $derived(blogPosts.slice(firstPost, firstPost + POSTS_PER_PAGE));
    const numPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);


</script>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
    {#each displayedPosts as post}
        <BlogPostAdmin {...post} /> 
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

