<script lang="ts">
    import { cover } from "src/assets/Cover.mockdata";
    import About from "src/components/About.svelte";
    import Contact from "src/components/Contact.svelte";
    import Cover from "src/components/Cover.svelte";
    import Blog from "src/components/Blog.svelte";  
    import Events from "src/components/Events.svelte";
    import Works from "src/components/Works.svelte";
    import { type PageData } from "src/types/PageData.types"

    const { data } = $props<{ data: PageData }>();
    const { apiData } = data;
</script>

<Cover cover={cover} />
<main class="flex-1 px-4 md:px-12 2xl:px-36 bg-base-300 flow-root">
    <div class="divider mt-0"></div>
    <h2 id="diario" class="text-4xl">DIÁRIO</h2>
    <Blog blogPosts={apiData.blog_posts} />
    <div class="divider"></div>
    <h2 id="bio" class="text-4xl">QUEM SOU EU</h2>
    <About aboutSections={apiData.about_sections} />
    <div class="clear-both"></div>
    <div class="divider"></div>
    <h2 id="obra" class="text-4xl">OBRA</h2>
    <Works works={apiData.albums} />
    <div class="divider"></div>
    <h2 id="agenda" class="text-4xl">AGENDA</h2>
    <Events events={apiData.events} /> 
    <div class="divider"></div>
    <h2 id="contato" class="text-4xl">CONTATO</h2>
    <Contact contacts={apiData.contacts} socialMedia={apiData.social_media}/>
</main>

<style>
    h2 {
        margin-bottom: 2rem; 
    }
</style>
