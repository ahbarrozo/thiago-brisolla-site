<script lang="ts">
    import { onMount } from 'svelte';
    import { type Readable } from 'svelte/store';
    import { createEditor } from 'svelte-tiptap';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    import type { AboutSection } from 'src/types/About.types';
	import { PlusSolid, TrashSolid } from 'svelte-awesome-icons';
	import { toaster } from 'src/stores/toaster.store';
	import ImageUploader from '../ImageUploader.svelte';
	import type { Image } from 'src/types/Image.types';

    interface Button {
        active: () => boolean;
        command: () => boolean;
        content: string;
        name: string;
        type: 'block' | 'inline'; 
    }

    let { id, num, images, text, onDelete }: AboutSection & { num: number, onDelete: Function } = $props();

    let editor = $state() as Readable<Editor>;
    let editorDiv: HTMLElement;
    let modal: HTMLDialogElement;    
    let menuItems: Button[] = $state([]);
    let postForm = $state({
        images
    });

    /**
     *  Upon mounting, the tiptap editor will be initialized,
     *  including a callback to update the text field and all 
     *  its buttons.
     */
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
     *  Add an empty image to the submission form
     */
    function addImage() {
        const emptyImage = {
            title: '',
            description: '',
            path: ''
        }
        postForm.images.push(emptyImage);
    }

    /**
     *  Calls the DELETE API function to delete the section
     *  based on its ID. This function is triggered at the 
     *  confirmation of the dialog message. In case of success, 
     *  a parent function 'onDelete' will be called to remove 
     *  the element from the DOM.
     */
    async function deleteAboutSection() {
        const aboutSectionFormData = new FormData();
        aboutSectionFormData.append('id', id!.toString());

        const response = await fetch('?/deleteAboutSection', {  
            method: 'POST',
            body: aboutSectionFormData
        });
        const responseData = await response.json();

        if (responseData.status === 200) {
            toaster.show('Section deleted', 'success');
            onDelete(id);
        }
        else
            toaster.show('Error: could not delete section', 'error');
        modal.close();
    }

    /**
     *  Function to be called upon an onDelete event from 
     *  ImageUploader is triggered on the child component. 
     *  It filters the sections by ID for deleted sections
     *
     *  @param index : number index of the deleted section
     */
    function deleteImage(index: number) {
        postForm.images = postForm.images?.slice(0, index).concat(postForm.images?.slice(index + 1));
    }
    
    /**
     *  Calls the POST or PUT API request for about sections, depending 
     *  on the presence of an id prop.
     */
    async function saveAboutSection() {
        // Validating before allowing submission
        if (!text || text.length === 0) {
            toaster.show('Favor inserir texto', 'error');
            return;
        }

        const aboutSectionFormData = new FormData();
        const body = {
            id: id && id.toString(),  // include only if it exists
            text
        };

        Object.entries(body).forEach(([k, v]) => {
            if (v)
                aboutSectionFormData.append(k, v);
        });       

        /**
         *  JSON stringify the array, to prevent issues with 
         *  formData converting empty arrays into empty strings
         */
        aboutSectionFormData.append('images', JSON.stringify(postForm.images));

        const response = !id ?
                         await fetch('?/saveAboutSection', {
                             method: 'POST',
                             body: aboutSectionFormData
                         }) :
                         await fetch('?/updateAboutSection', {
                             method: 'POST',
                             body: aboutSectionFormData
                         });

        const responseData = await response.json();
        switch(responseData.status) {
            case 200:
                toaster.show('Section successfully updated', 'success');
                break;
            case 201:
                toaster.show('New section successfully created', 'success');
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
 
    /**
     *  Updates the list of images by updating the image at the 
     *  index i of the array
     *
     *  @param i : number - index in the array of images
     *  @param image : Image - image object to replace in index i
     */
    function updateImage(i: number, image: Image) {
        if (postForm.images && postForm.images.length > i)
            postForm.images[i] = { ...image };
    }   
</script>

<h2 class="text-3xl m-4">Parte {num}</h2>
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
        <div class="w-full" 
             bind:this={editorDiv}></div>
    </label>
   
    <h3 class="text-3xl m-4">Imagem</h3>
     {#if postForm.images && postForm.images.length > 0}
        {#each postForm.images as image, i}
            <ImageUploader {...image} 
                onDelete={() => deleteImage(i)}
                onUpdate={(updatedImage: Image) => updateImage(i, updatedImage)} />
        {/each}
    {/if}
    {#if postForm.images && postForm.images.length === 0}
        <div class="w-full">
            <button class="btn btn-primary btn-outline mt-10"
                    onclick={addImage}>
                    <PlusSolid />
                    Nova Imagem
            </button>
        </div>
    {/if}

    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={saveAboutSection}>Salvar</button>
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
                <button class="btn btn-error text-white"
                        onclick={deleteAboutSection}>Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
