<script lang="ts">
	import { toaster } from 'src/stores/toaster.store';
	import type { Contact } from 'src/types/Contact.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    let { id, contact, mail, name, phone }: Contact = $props();
    let modal: HTMLDialogElement;

    // Creates a POST request body to save a new contact
    function saveContact() {
        const body: Contact = {
            contact,
            mail,
            name,
            phone
        };

        console.log(body);
        toaster.show('Trying to save contact');
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
            <input type="input" class="input input-lg" value={name} placeholder="Título" />
        </label>
        <label for="contact" class="input text-xl w-[30vw]">
            <input type="input" class="input input-lg" value={contact} placeholder="Responsável" />
        </label>
        <label for="mail" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" value={mail} placeholder="E-mail" />
        </label>
        <label for="phone" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" value={phone} placeholder="Telefone" />
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
                <button class="btn btn-error text-white">Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
