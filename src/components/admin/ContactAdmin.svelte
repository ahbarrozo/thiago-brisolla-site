<script lang="ts">
	import { toaster } from 'src/stores/toaster.store';
	import type { Contact } from 'src/types/Contact.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    let { 
        id, 
        contact, 
        mail, 
        name, 
        phone, 
        onDelete 
    }: Contact & { onDelete: Function } = $props();
    let modal: HTMLDialogElement;
    let postFormData = $state({
        id,
        contact,
        mail,
        name,
        phone
    });

    /**
     *  Calls the DELETE API function to delete the contact
     *  based on its ID. This function is triggered at the 
     *  confirmation of the dialog message. In case of success, 
     *  a parent function 'onDelete' will be called to remove 
     *  the element from the DOM.
     */
    async function deleteContact() {
        const contactFormData = new FormData();
        contactFormData.append('id', id!.toString());

        const response = await fetch('?/deleteContact', {  
            method: 'POST',
            body: contactFormData
        });
        const responseData = await response.json();

        if (responseData.status === 200) {
            toaster.show('Event deleted', 'success');
            onDelete(id);
        }
        else
            toaster.show('Error: could not delete event', 'error');
        modal.close();
    }

    // Creates a POST request body to save a new contact
    async function saveContact() {
        const contactFormData = new FormData();
        const body: Contact = {
            id,
            contact: postFormData.contact,
            mail: postFormData.mail,
            phone: postFormData.phone,
            name: postFormData.name
        };

        Object.entries(body).forEach(([k, v]) => {
            if (v)
                contactFormData.append(k, v);
        });

        const response = !id ?
                         await fetch('?/saveContact', {
                             method: 'POST',
                             body: contactFormData
                         }) :
                         await fetch('?/updateContact', {
                             method: 'POST',
                             body: contactFormData
                         });

        const responseData = await response.json();
        switch(responseData.status) {
            case 200:
                toaster.show('Contact successfully updated', 'success');
                break;
            case 201:
                toaster.show('New contact successfully created', 'success');
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
        <label for="name" class="input text-xl w-[20.28vw]">
            <input type="input" class="input input-lg" bind:value={postFormData.name} placeholder="Título" />
        </label>
        <label for="contact" class="input text-xl w-[30vw]">
            <input type="input" class="input input-lg" bind:value={postFormData.contact} placeholder="Responsável" />
        </label>
        <label for="mail" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" bind:value={postFormData.mail} placeholder="E-mail" />
        </label>
        <label for="phone" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" bind:value={postFormData.phone} placeholder="Telefone" />
        </label>
    </div>
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={saveContact}>Salvar</button>
        <button class="btn btn-error text-white mt-10"
                onclick={showModal}>
            <TrashSolid />
            Apagar
        </button>
    </div>
</fieldset>
<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Apagar contato</h3>
        <p class="py-4">Você tem certeza que quer continuar?</p>
        <div class="modal-action">
            <form class="flex gap-x-4" method="dialog">
                <button class="btn btn-error text-white"
                        onclick={deleteContact}
                >Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
