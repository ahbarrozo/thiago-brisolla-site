<script lang="ts">
    import { type BlogPostImage, type BlogPostProps } from 'src/types/BlogPost.types';
    import BlogPostAdmin from './BlogPostAdmin.svelte';

    interface BlogProps {
        blogPosts: BlogPostProps[];
    }

    const POSTS_PER_PAGE = 6;

    const { blogPosts }: BlogProps = $props();
    let emptyPost: BlogPostProps = {
        date: (new Date()).toISOString().slice(0, 11),
        images: [] as BlogPostImage[],
        isFirst: true,
        subtitle: '',
        title: '',
        text: ''
    } 

    let currentPage = $state(1);
    let firstPost = $derived((currentPage - 1) * POSTS_PER_PAGE);
    let displayedPosts = $derived(blogPosts.slice(firstPost, firstPost + POSTS_PER_PAGE));
    let isNewPostDisplayed = $state(false);
    const numPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    
    const displayNewPost = () => isNewPostDisplayed = true;

</script>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
    {#if !isNewPostDisplayed}
        <button class="btn btn-primary w-full" onclick={displayNewPost}>Nova postagem</button>
    {/if}

    {#if isNewPostDisplayed}
        <BlogPostAdmin {...emptyPost} />  
    {/if}
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

