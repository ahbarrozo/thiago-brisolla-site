<script lang="ts">
	import { goto } from '$app/navigation';
	import 'src/app.css';
    import Toaster from 'src/components/Toaster.svelte'
    import Toolbar from 'src/components/Toolbar.svelte';
	let { children } = $props();

    let authForm = $state({ username: '', password: '' });
    let modal: HTMLDialogElement;

    async function authenticate() {

        const authFormData = new FormData();
        authFormData.append('username', authForm.username);
        authFormData.append('password', authForm.password);

        const response = await fetch('?/authenticate', {
                             method: 'POST',
                             body: authFormData
                         });
        const responseData = await response.json();

        if (responseData.status === 200) {
            modal.close();
            goto('/admin');
        }
    }

    /** 
     *  Checks if the dialog HTML element is mounted, and if so, 
     *  calls the showModal function. An empty form is used to 
     *  allow for the usage of SvelteKit actions
     */
    async function attemptAccess() {
        const response = await fetch('?/verifyToken', {
            method: 'POST',
            body: new FormData()
        });
        
        const responseData = await response.json();
        if (responseData.type === 'redirect')
            goto('/admin');

        else
            if (modal)
                modal.showModal();
    }
</script>

<div class="app h-full">
    <div class="theme-skeleton h-full">
        <Toolbar onAuthentication={attemptAccess} />
        {@render children()}
        <footer class="footer flex
                       justify-center 
                       sm:footer-horizontal
                       text-neutral-content
                       p-10 bg-base-300">
            © Copyright Thiago Brisolla - Todos os direitos reservados
        </footer>
        <dialog bind:this={modal} class="modal">
            <div class="modal-box w-96">
                <h3 class="text-lg font-bold">Acesso à página de administração</h3>
                <fieldset class="fieldset bg-base-200 p-4 rounded-box">
                    <label for="title" class="input text-xl w-auto">
                        <input type="input" class="input input-lg"
                               placeholder="Usuário"
                               bind:value={authForm.username} />
                    </label>
                    <label for="subtitle" class="input text-xl w-auto">
                        <input type="password" class="input input-lg" 
                               placeholder="Senha"
                               bind:value={authForm.password} />
                    </label>
                    <div class="modal-action w-full">
                    <button class="btn btn-primary text-white"
                            onclick={authenticate}>Acessar</button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button aria-label="Fechar">close</button>
            </form>
        </dialog>

        <Toaster />
    </div>
</div>
