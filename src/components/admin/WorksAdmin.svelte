<script lang="ts">
    import type { Work, WorksProps } from 'src/types/Work.types';
	import WorkAdmin from './WorkAdmin.svelte';
	import type { Image } from 'src/types/Image.types';

    const WORKS_PER_PAGE = 6;

    const { works }: WorksProps = $props();
    const emptyWork: Work & { isNew?: boolean } = {
        date: '',
        title: '',
        description: '',
        images: [] as Image[],
        isNew: true, 
    } 

    let worksList = $state(works)
    let currentPage = $state(1);
    let firstWork = $derived((currentPage - 1) * WORKS_PER_PAGE);
    let displayedWorks = $derived(worksList.slice(firstWork, firstWork + WORKS_PER_PAGE));
    let numPages = $derived(Math.ceil(worksList.length / WORKS_PER_PAGE));
    let pages = $derived(Array.from({ length: numPages }, (_, i) => i + 1));

    function displayNewWork() {
        worksList = [
            {...emptyWork, description: 'Descreva a nova obra.'}, 
            ...worksList
        ];
    }
    
    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  works by ID for deleted works
     *
     *  @param id : number ID of the deleted album
     */
    function onDelete(id: number) {
        worksList = worksList.filter(work => work.id !== id);
    }
</script>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
    <button class="btn btn-primary w-full" onclick={displayNewWork}>Nova obra</button>
    {#each displayedWorks as work (work.id)}
        <WorkAdmin {...work} onDelete={() => onDelete(work.id!)} /> 
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

