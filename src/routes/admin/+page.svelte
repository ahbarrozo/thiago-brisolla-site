<script lang="ts">
    import AboutAdmin from "src/components/admin/AboutAdmin.svelte";
    import BlogAdmin from "src/components/admin/BlogAdmin.svelte";  
    import ContactsAdmin from "src/components/admin/ContactsAdmin.svelte";
	import EventsAdmin from "src/components/admin/EventsAdmin.svelte";
    import WorksAdmin from "src/components/admin/WorksAdmin.svelte";
	import type { PageData } from "src/types/PageData.types";

    const { data } = $props<{ data: PageData }>();
    const { apiData } = data;
</script>

<main class="flex-1 px-4 md:px-12 2xl:px-36 bg-base-300">
    <div class="divider mt-0"></div>
    <h2 id="diario" class="text-4xl mb-8">ADMINISTRAÇÃO</h2>
    <div class="tabs tabs-lift">
        <input type="radio" name="my_tabs_3" class="tab" aria-label="DIÁRIO" checked />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <BlogAdmin blogPosts={apiData.blog_posts} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="SOBRE" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <AboutAdmin aboutSections={apiData.about_sections} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="OBRA" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <WorksAdmin works={apiData.works} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="AGENDA" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <EventsAdmin events={apiData.events} />
        </div>
        <input type="radio" name="my_tabs_3" class="tab" aria-label="CONTATO" />
        <div class="tab-content bg-base-100 border-base-300 p-6">
            <ContactsAdmin contacts={apiData.contacts} socialMedia={apiData.social_media} />
        </div>

    </div>
</main>
