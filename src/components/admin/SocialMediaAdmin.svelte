<script lang="ts">
	import type { SocialMedia } from 'src/types/SocialMedia.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    let { id, link, name }: SocialMedia = $props();
    let modal: HTMLDialogElement;
    const options = [
        
        {
            displayName: 'Facebook',
            name: 'facebook',
        },
        {
            displayName: 'Instagram',
            name: 'instagram',
        },

    ]

    /** 
     *  Checks if the dialog HTML element is mounted, and if so, 
     *  calls the showModal function
     */
    function showModal() {
        if (modal) {
            modal.showModal();
        }
    }
</script>

<fieldset class={`fieldset w-full bg-base-200 border border-base-300 mb-4 p-4 rounded-box`}>
    <div class="flex flex-row flex-wrap gap-x-4 gap-y-8 w-full">
        <label for="name" class="select text-xl w-[20.28vw]">
            <select class="select select-lg" value={name} placeholder="Mídia social">
                {#each options as option}
                    <option value={option.name}>
                        {option.displayName}
                    </option>
                {/each}
            </select>
        </label>
        <label for="phone" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" value={link} placeholder="Telefone" />
        </label>
    </div>
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10">Salvar</button>
        <button class="btn btn-error text-white mt-10"
                onclick={showModal}>
            <TrashSolid />
            Apagar
        </button>
    </div>
</fieldset>
<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Apagar mídia social</h3>
        <p class="py-4">Você tem certeza que quer continuar?</p>
        <div class="modal-action">
            <form class="flex gap-x-4" method="dialog">
                <button class="btn btn-error text-white">Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
