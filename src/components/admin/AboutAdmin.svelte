<script lang="ts">
	import type { AboutProps, AboutSection } from "src/types/About.types";
    import AboutSectionAdmin from "./AboutSectionAdmin.svelte";
	import type { Image } from "src/types/Image.types";

    const { aboutSections }: AboutProps = $props();
    const emptySection: AboutSection = {
        text: '',
        images: [] as Image[]
    };

    let sections: AboutSection[] = $state(aboutSections)
    
    function displayNewSection() {
        sections = [...sections, {...emptySection}];
    }

    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  sections by ID for deleted sections
     *
     *  @param id : number ID of the deleted section
     */
    function onDelete(id: number) {
        sections = sections.filter(section => section.id !== id);
    }
</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each sections as section, i (section.id) }
        <AboutSectionAdmin { ...section } num={i+1} onDelete={() => onDelete(section.id!)} />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewSection}>Novo parágrafo</button>
</div>
