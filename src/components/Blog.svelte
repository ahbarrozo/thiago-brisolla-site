<script lang="ts">
	import BlogPost from './BlogPost.svelte';
    import { type BlogPostProps } from '../types/BlogPost.types';

    interface BlogProps {
        blogPosts: BlogPostProps[];
    }

    const POSTS_PER_PAGE = 6;

    const { blogPosts }: BlogProps = $props();
    blogPosts[0].isFirst = true;
    const newestPost = blogPosts[0];

    let currentPage = $state(1);
    let firstPost = $derived((currentPage - 1) * POSTS_PER_PAGE + 1);
    let displayedPosts = $derived(blogPosts.slice(firstPost, firstPost + POSTS_PER_PAGE));
    const numPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);

</script>
<div class="flex flex-wrap gap-x-8 gap-y-4 mb-10">
    <BlogPost {...newestPost}></BlogPost> 
    {#each displayedPosts as post}
        {#if !post.isFirst}
            <BlogPost {...post}></BlogPost> 
        {/if}
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

