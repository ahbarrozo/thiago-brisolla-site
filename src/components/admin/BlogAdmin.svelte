<script lang="ts">
    import { type BlogPostProps } from 'src/types/BlogPost.types';
    import BlogPostAdmin from './BlogPostAdmin.svelte';
	import type { Image } from 'src/types/Image.types';

    interface BlogProps {
        blogPosts: BlogPostProps[];
    }

    const POSTS_PER_PAGE = 6;

    const { blogPosts }: BlogProps = $props();
    const emptyPost: BlogPostProps = {
        date: (new Date()).toISOString(),
        images: [] as Image[],
        isFirst: true,
        subtitle: '',
        title: '',
        text: ''
    } 

    let posts = $state(blogPosts)
    let currentPage = $state(1);
    let firstPost = $derived((currentPage - 1) * POSTS_PER_PAGE);
    let displayedPosts = $derived(posts.slice(firstPost, firstPost + POSTS_PER_PAGE));
    let numPages = $derived(Math.ceil(posts.length / POSTS_PER_PAGE));
    let pages = $derived(Array.from({ length: numPages }, (_, i) => i + 1));

    function displayNewPost() {
        posts = [{...emptyPost}, ...posts];
    }

    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  posts by ID for deleted posts
     *
     *  @param id : number ID of the deleted post
     */
    function onDelete(id: number) {
        posts = posts.filter(post => post.id !== id);
    }

</script>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
    <button class="btn btn-primary w-full" onclick={displayNewPost}>Nova postagem</button>
    {#each displayedPosts as post (post.id)}
        <BlogPostAdmin {...post} onDelete={() => onDelete(post.id!)} /> 
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

