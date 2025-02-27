<script lang="ts">
	import type { AboutSection } from "../types/About.types";

    interface AboutProps {
        aboutSections: AboutSection[];
    }

    const { aboutSections }: AboutProps = $props();
</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each aboutSections as section, i }
        {#if section.image}
            <img src={section.image} 
                 alt="Foto da biografia"
                 class={`${ i % 2 == 0 ? "float-left" : "float-right"} 
                        max-w-2/5
                        max-h-1/2
                        m-5 mr-10
                        overflow-hidden`} />
        {/if}
        {@html section.text}
    {/each}
</div>
