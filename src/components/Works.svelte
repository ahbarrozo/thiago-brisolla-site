<script lang="ts">
	import type { WorksProps } from "../types/Work.types";

    const { works }: WorksProps = $props();
</script>
<div class="flex flex-wrap gap-x-8 gap-y-4 mb-10">
    {#each works as work}
        <div class="hero bg-base-200 rounded-2xl mb-10 w-[95vw] xl:w-7/15">
            <div class="hero-content flex-col sm:flex-row">
                {#if work.images && work.images.length > 0}
                    <img src={work.images[0].path}
                         alt={"Capa da obra " + work.title}
                         class="object-cover object-top 
                                overflow-hidden h-80 w-80 
                                rounded-lg shadow-2xl ml-4 mr-4 sm:mr-10" />
                {/if}
                <div class="relative h-80 w-80">
                    <div class="absolute top-0">
                        <h1 class="text-3xl font-bold">{work.title}</h1>
                        <span class="text-sm">{work.date.slice(0,4)}</span>
                        <div class="py-6">
                            {@html work.description}
                        </div>
                    </div>
                    <button class="absolute btn btn-primary bottom-0 right-0 m-4">Escutar</button>
                </div>
            </div>
        </div>
    {/each}
</div>
