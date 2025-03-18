<script lang="ts">
	import type { AboutProps } from "../types/About.types";

    const { aboutSections }: AboutProps = $props();
</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each aboutSections as section, i }
        {#if section.images && section.images.length > 0}
            <img src={section.images[0].path} 
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
