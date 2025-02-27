<script lang="ts">
    import { aboutSections } from "../../assets/About.mockdata";
    import { albums } from "../../assets/Discography.mockdata";
    import { blogPosts } from "src/assets/Blog.mockdata";
    import { contacts } from "../../assets/Contact.mockdata";
    import { cover } from "../../assets/Cover.mockdata";
    import { events } from "../../assets/Events.mockdata";
    import { socialMedia } from "../../assets/SocialMedia.mockdata";
    import About from "../../components/About.svelte";
    import Contact from "../../components/Contact.svelte";
    import Cover from "../../components/Cover.svelte";
    import BlogAdmin from "src/components/admin/BlogAdmin.svelte";  
	import Discography from "../../components/Discography.svelte";
    import Events from "../../components/Events.svelte";

    let blogEntries = $state(blogPosts);

</script>

<main class="flex-1 px-4 md:px-12 2xl:px-36 bg-base-300">
    <div class="divider mt-0"></div>
    <h2 id="diario" class="text-4xl">ADMINISTRAÇÃO</h2>
    <div class="tabs tabs-lift">
        <input type="radio" name="my_tabs_3" class="tab" aria-label="DIÁRIO" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <BlogAdmin blogPosts={blogEntries} />
        </div>

        <input type="radio" name="my_tabs_3" class="tab" aria-label="SOBRE" />
        <div class="tab-content bg-base-100 border-base-300 p-6">SOBRE</div>

        <input type="radio" name="my_tabs_3" class="tab" aria-label="OBRA" />
        <div class="tab-content bg-base-100 border-base-300 p-6">OBRA</div>
    </div>
</main>

<style>
    h2 {
        margin-bottom: 2rem; 
    }
</style>
