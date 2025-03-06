<script lang="ts">
    import { aboutSections } from "src/assets/About.mockdata";
    import { albums } from "src/assets/Discography.mockdata";
    import { blogPosts } from "src/assets/Blog.mockdata";
    import AboutAdmin from "src/components/admin/AboutAdmin.svelte";
    import BlogAdmin from "src/components/admin/BlogAdmin.svelte";  
    import DiscographyAdmin from "src/components/admin/DiscographyAdmin.svelte";

    let blogEntries = $state(blogPosts);

</script>

<main class="flex-1 px-4 md:px-12 2xl:px-36 bg-base-300">
    <div class="divider mt-0"></div>
    <h2 id="diario" class="text-4xl mb-8">ADMINISTRAÇÃO</h2>
    <div class="tabs tabs-lift">
        <input type="radio" name="my_tabs_3" class="tab" aria-label="DIÁRIO" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <BlogAdmin blogPosts={blogEntries} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="SOBRE" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <AboutAdmin aboutSections={aboutSections} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="OBRA" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <DiscographyAdmin albums={albums} />
        </div>
    </div>
</main>

