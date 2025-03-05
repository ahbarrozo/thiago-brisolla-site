<script lang="ts">
	import type { Album } from "../types/Album.types";

    interface DiscographyProps {
        albums: Album[];
    }

    const { albums }: DiscographyProps = $props();
</script>
<div class="flex flex-wrap gap-x-8 gap-y-4 mb-10">
    {#each albums as album}
        <div class="hero bg-base-200 rounded-2xl mb-10 w-[95vw] xl:w-7/15">
            <div class="hero-content flex-col sm:flex-row">
                {#if album.image}
                    <img src={album.image}
                         alt={"Capa do disco " + album.title}
                         class="object-cover object-top 
                                overflow-hidden h-80 w-80 
                                rounded-lg shadow-2xl ml-4 mr-10" />
                {/if}
                <div class="relative h-80 w-80">
                    <div class="absolute top-0">
                        <h1 class="text-3xl font-bold">{album.title}</h1>
                        <span class="text-sm">{album.date.slice(0,4)}</span>
                        <div class="py-6">
                            {@html album.description}
                        </div>
                    </div>
                    <button class="absolute btn btn-primary bottom-0 right-0 m-4">Escutar</button>
                </div>
            </div>
        </div>
    {/each}
</div>
