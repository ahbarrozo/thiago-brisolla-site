<script lang="ts">
    import { aboutSections } from "../assets/About.mockdata";
    import { albums } from "../assets/Discography.mockdata";
    import { blogPosts } from "../assets/Blog.mockdata";
    import { contacts } from "../assets/Contact.mockdata";
    import { cover } from "../assets/Cover.mockdata";
    import { events } from "../assets/Events.mockdata";
    import { socialMedia } from "../assets/SocialMedia.mockdata";
    import About from "../components/About.svelte";
    import Contact from "../components/Contact.svelte";
    import Cover from "../components/Cover.svelte";
    import Blog from "../components/Blog.svelte";  
	import Discography from "../components/Discography.svelte";
    import Events from "../components/Events.svelte";
</script>

<Cover cover={cover} />
<main class="flex-1 px-4 md:px-12 2xl:px-36 bg-base-300">
    <div class="divider mt-0"></div>
    <h2 id="diario" class="text-4xl">DIÁRIO</h2>
    <Blog blogPosts={blogPosts} />
    <div class="divider"></div>
    <h2 id="bio" class="text-4xl">QUEM SOU EU</h2>
    <About aboutSections={aboutSections} />
    <div class="divider"></div>
    <h2 id="obra" class="text-4xl">OBRA</h2>
    <Discography albums={albums} /> 
    <div class="divider"></div>
    <h2 id="agenda" class="text-4xl">AGENDA</h2>
    <Events events={events} /> 
    <div class="divider"></div>
    <h2 id="contato" class="text-4xl">CONTATO</h2>
    <Contact contacts={contacts} socialMedia={socialMedia}/>
</main>

<style>
    h2 {
        margin-bottom: 2rem; 
    }
</style>
