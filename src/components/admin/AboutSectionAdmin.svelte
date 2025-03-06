<script lang="ts">
    import { onMount } from 'svelte';
    import { type Readable } from 'svelte/store';
    import { createEditor } from 'svelte-tiptap';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    import type { AboutSection } from 'src/types/About.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    interface Button {
        active: () => boolean;
        command: () => boolean;
        content: string;
        name: string;
        type: 'block' | 'inline'; 
    }

    let { id, image, text }: AboutSection = $props();


    let editor = $state() as Readable<Editor>;
    let editorDiv: HTMLElement;
    let modal: HTMLDialogElement;    
    let menuItems: Button[] = $state([]);

    onMount(() => {
        editor = createEditor({
            extensions: [StarterKit],
            element: editorDiv,
            content: text,
            onUpdate: ({ editor }) => {
                text = editor.getHTML();
            },
            editorProps: {
                attributes: {
                    class: `rounded-b-md p-8 outline-hidden w-auto`
                }
            }
        });

        // Function to check if a formatting option is active
        const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);

        menuItems = [
            {
                active: () => isActive('heading', { level: 1 }),
                command: () => $editor.chain().focus().toggleHeading({ level: 1 }).run(),
                content: 'H1',
                name: 'heading-1',
                type: 'block'
            },
            {
                active: () => isActive('heading', { level: 2 }),
                command: () => $editor.chain().focus().toggleHeading({ level: 2 }).run(),
                content: 'H2',
                name: 'heading-2',
                type: 'block'
            },
            {
                active: () => isActive('paragraph'),
                command: () => $editor.chain().focus().setParagraph().run(),
                content: 'P',
                name: 'paragraph',
                type: 'block'
            },
            {
                active: () => isActive('bold'),
                command: () => $editor.chain().focus().toggleBold().run(),
                content: 'B',
                name: 'bold',
                type: 'inline'
            },
            {
                active: () => isActive('italic'),
                command: () => $editor.chain().focus().toggleItalic().run(),
                content: 'I',
                name: 'italic',
                type: 'inline'
            },
        ];
    });

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

<h2 class="text-3xl m-4">Parágrafo {id}</h2>
<fieldset class={`fieldset w-full bg-base-200 border border-base-300 mb-4 p-4 rounded-box`}>
    <label for="text" class="input text-xl w-auto flex flex-col gap-y-4 bg-base-300 overflow-y-scroll h-100">
        <div class="flex mt-4 gap-x-4">
        {#if editor}
            <div class="join">
                {#each menuItems.filter(item => item.type === 'block') as item}
                    <button aria-label={item.content}
                            class="btn btn-square join-item {item.active() ? 'btn-active' : ''}"
                            onclick={() => item.command()}
                        >{item.content}</button>
                {/each}
            </div>
                
            <div class="join ml-2">
                {#each menuItems.filter(item => item.type === 'inline') as item}
                    <button aria-label={item.content}
                            class="btn btn-square join-item {item.active() ? 'btn-active' : ''}"
                            onclick={() => item.command()}
                        >{item.content}</button>
                {/each}
            </div>
        {/if}
        </div>
        <div bind:this={editorDiv}></div>
    </label>
    <div class="validator-hint hidden">Insira um texto</div>
   
    <h3 class="text-3xl m-4">Image</h3>
    <label for="images" class="input flex flex-col validator text-xl w-auto">
        <p>{image}</p>
    </label> 
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
        <h3 class="text-lg font-bold">Apagar parágrafo</h3>
        <p class="py-4">Você tem certeza que quer continuar?</p>
        <div class="modal-action">
            <form class="flex gap-x-4" method="dialog">
                <button class="btn btn-error text-white">Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
