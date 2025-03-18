<script lang="ts">
    import type { Album, DiscographyProps } from 'src/types/Album.types';
	import AlbumAdmin from './AlbumAdmin.svelte';
	import type { Image } from 'src/types/Image.types';

    const ALBUMS_PER_PAGE = 6;

    const { albums }: DiscographyProps = $props();
    const emptyAlbum: Album & { isNew?: boolean } = {
        date: '',
        title: '',
        description: '',
        images: [] as Image[],
        isNew: true, 
    } 

    let discography = $state(albums)
    let currentPage = $state(1);
    let firstAlbum = $derived((currentPage - 1) * ALBUMS_PER_PAGE);
    let displayedAlbums = $derived(discography.slice(firstAlbum, firstAlbum + ALBUMS_PER_PAGE));
    let numPages = $derived(Math.ceil(discography.length / ALBUMS_PER_PAGE));
    let pages = $derived(Array.from({ length: numPages }, (_, i) => i + 1));

    function displayNewAlbum() {
        discography = [
            {...emptyAlbum, description: 'Descreva a nova obra.'}, 
            ...discography
        ];
    }
    
    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  albums by ID for deleted albums
     *
     *  @param id : number ID of the deleted album
     */
    function onDelete(id: number) {
        discography = discography.filter(album => album.id !== id);
    }
</script>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
    <button class="btn btn-primary w-full" onclick={displayNewAlbum}>Nova obra</button>
    {#each displayedAlbums as album (album.id)}
        <AlbumAdmin {...album} onDelete={() => onDelete(album.id!)} /> 
    {/each}
</div>
<div class="join">
    {#each pages as page}
        <input class="join-item btn btn-square"
               type="radio"
               name="options"
               value={page}
               aria-label={`${page}`}
               checked={page === currentPage}
               bind:group={currentPage} />
    {/each}
</div>

