<script lang="ts">
	import type { Work } from "../types/Work.types";

    const { 
        date,
        description,
        link,
        title,
        images
    }: Work = $props();

    let modal: HTMLDialogElement;    

    /** 
     *  Checks if the dialog HTML element is mounted, and if so, 
     *  calls the showModal function
     */
    function showModal() {
        if (modal) {
            modal.showModal();
        }
    }

    function truncatedHTML(limit: number = 150) {
        if (description.length <= 150) return description;
        return description.slice(0, limit) + '...';
    }
</script>

<div class="hero bg-base-200 rounded-2xl mb-10 w-[95vw] xl:w-7/15">
    <div class="hero-content flex-col sm:flex-row">
        {#if images.length > 0}
            <img src={images[0].path}
                 alt={"Capa da obra " + title}
                 class="object-cover object-top 
                        overflow-hidden h-80 w-80 
                        rounded-lg shadow-2xl ml-4 mr-4 sm:mr-10" />
        {/if}
        <div class="relative h-80 w-80">
            <div class="absolute top-0">
                <h1 class="text-3xl font-bold">{title}</h1>
                <span class="text-sm">{date.slice(0,4)}</span>
                <div class="py-6">
                    {@html truncatedHTML()}
                </div>
            </div>
            <button class="absolute btn btn-primary bottom-0 right-0 m-4"
                    onclick={showModal}>Detalhes</button>
        </div>
    </div>


<dialog bind:this={modal} class="modal">
    <div class="modal-box absolute lg:static left-[2.5vw] w-[95vw] max-w-[95vw] lg:w-3/4 lg:max-w-3/4 p-4">
        <div class="flex justify-between">
            <div class="pt-6 pl-6">
                <h1 class="font-bold">{title}</h1>
            </div>
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-circle bg-transparent"
                        aria-label="Fechar janela com post">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="2.5"
                         stroke="currentColor"
                         class="size-[1.2em]">
                        <path d="M19 6.41L17.59 5 12 10.59 
                               6.41 5 5 6.41 10.59 12 5 
                                 17.59 6.41 19 12 13.41 17.59 
                                 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
            </form>
        </div>
        <div class="py-4 text-justify space-y-2 flex-1">
            {#if images.length == 1}
                <img src={images[0].path} 
                     alt="Foto da postagem"
                     class="float-left  w-3/5
                            aspect-[4/3]
                            m-5 mr-10
                            overflow-hidden" />
            {/if}           
            {@html description}
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button aria-label="Fechar">close</button>
    </form>
</dialog>
</div>


