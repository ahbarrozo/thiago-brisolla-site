<script lang="ts">
	import type { AboutProps, AboutSection } from "src/types/About.types";
    import AboutSectionAdmin from "./AboutSectionAdmin.svelte";

    const { aboutSections }: AboutProps = $props();
    const emptySection: AboutSection = {
        text: ''
    };
        let sections: AboutSection[] = $state(aboutSections)
    
    function displayNewSection() {
        sections = [...sections, {...emptySection}];
    }

</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each sections as section, i (i) }
        <AboutSectionAdmin { ...section } id={i+1} />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewSection}>Novo parágrafo</button>
</div>
