<script lang="ts">
	import { toaster } from 'src/stores/toaster.store';
	import type { SocialMedia } from 'src/types/SocialMedia.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    let { 
        id, 
        link, 
        name,
        onDelete
    }: SocialMedia & { onDelete: Function } = $props();
    let postFormData = $state({
        id,
        link,
        name
    });
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
     *  Calls the DELETE API function to delete social media entry
     *  based on its ID. This function is triggered at the 
     *  confirmation of the dialog message. In case of success, 
     *  a parent function 'onDelete' will be called to remove 
     *  the element from the DOM.
     */
    async function deleteSocialMedia() {
        const socialMediaFormData = new FormData();
        socialMediaFormData.append('id', id!.toString());

        const response = await fetch('?/deleteSocialMedia', {  
            method: 'POST',
            body: socialMediaFormData
        });
        const responseData = await response.json();

        if (responseData.status === 200) {
            toaster.show('Social media deleted', 'success');
            onDelete(id);
        }
        else
            toaster.show('Error: could not delete social media', 'error');
        modal.close();
    }

    // Creates a POST request body to save a new social meida
    async function saveSocialMedia() {
        const socialMediaFormData = new FormData();
        const body: SocialMedia = {
            id,
            link: postFormData.link,
            name: postFormData.name
        };

        Object.entries(body).forEach(([k, v]) => {
            if (v)
                socialMediaFormData.append(k, v);
        });

        const response = !id ?
                         await fetch('?/saveSocialMedia', {
                             method: 'POST',
                             body: socialMediaFormData
                         }) :
                         await fetch('?/updateSocialMedia', {
                             method: 'POST',
                             body: socialMediaFormData
                         });

        const responseData = await response.json();
        switch(responseData.status) {
            case 200:
                toaster.show('Social media successfully updated', 'success');
                break;
            case 201:
                toaster.show('New social media successfully created', 'success');
                break;
            default:
                toaster.show('An error has occurred', 'error');
        }
    }

 
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
            <select class="select select-lg" bind:value={postFormData.name} placeholder="Mídia social">
                {#each options as option}
                    <option value={option.name}>
                        {option.displayName}
                    </option>
                {/each}
            </select>
        </label>
        <label for="phone" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" bind:value={postFormData.link} placeholder="Link" />
        </label>
    </div>
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={saveSocialMedia}>Salvar</button>
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
                <button class="btn btn-error text-white"
                        onclick={deleteSocialMedia}>Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
