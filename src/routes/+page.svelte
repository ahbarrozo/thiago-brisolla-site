<script lang="ts">
    import { aboutSections } from "../assets/About.mockdata";
    import { albums } from "../assets/Discography.mockdata";
    import { blogPosts } from "../assets/Blog.mockdata";
    import About from "../components/About.svelte";
    import Blog from "../components/Blog.svelte";  
	import Discography from "../components/Discography.svelte";
</script>

<div class="divider mt-0"></div>
<h2 id="diario" class="text-4xl">DIÁRIO</h2>
<Blog blogPosts={blogPosts} />
<div class="divider"></div>
<h2 id="bio" class="text-4xl">QUEM SOU EU</h2>
<About aboutSections={aboutSections} />
<div class="divider"></div>
<h2 id="obra" class="text-4xl">OBRA</h2>
<Discography albums={albums} /> 

<style>
    h2 {
        margin-bottom: 2rem; 
    }
</style>
