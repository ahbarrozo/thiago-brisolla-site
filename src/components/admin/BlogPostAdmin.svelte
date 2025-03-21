<script lang="ts">
    import { onMount } from 'svelte';
    import { type Readable } from 'svelte/store';
    import { createEditor } from 'svelte-tiptap';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import { PlusSolid, TrashSolid } from 'svelte-awesome-icons';

    import { toaster } from 'src/stores/toaster.store';
    import { type BlogPostProps } from 'src/types/BlogPost.types';
    import { PUBLIC_LOCALE } from '$env/static/public';
	import ImageUploader from '../ImageUploader.svelte';
	import type { Image } from 'src/types/Image.types';

    interface Button {
        active: () => boolean;
        command: () => boolean;
        content: string;
        name: string;
        type: 'block' | 'inline'; 
    }

    let {
        id,
        date,
        images,
        subtitle,
        text,
        title,
        isFirst,
        onDelete
    }: BlogPostProps & { onDelete: Function }= $props();

    const dateFormat = new Intl.DateTimeFormat(PUBLIC_LOCALE, 
        { day: '2-digit', month: 'long', year: 'numeric' });
    const dateString = $derived(dateFormat.format(new Date(date)));

    let editor = $state() as Readable<Editor>;
    let editorDiv: HTMLElement;
    let modal: HTMLDialogElement;    
    let menuItems: Button[] = $state([]);
    let postForm = $state({
        subtitle,
        title,
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
                    class: `rounded-b-md p-8 outline-hidden ${isFirst ? "w-auto" : "w-100" }`
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

    function addImage() {
        const emptyImage = {
            title: '',
            description: '',
            path: ''
        }
        postForm.images.push(emptyImage);
    }

    /**
     *  Calls the DELETE API function to delete the post
     *  based on its ID. This function is triggered at the 
     *  confirmation of the dialog message. In case of success, 
     *  a parent function 'onDelete' will be called to remove 
     *  the element from the DOM.
     */
    async function deletePost() {
        const blogPostFormData = new FormData();
        blogPostFormData.append('id', id!.toString());

        const response = await fetch('?/deleteBlogPost', {  
    method: 'POST',
            body: blogPostFormData
        });
        const responseData = await response.json();

        if (responseData.status === 200) {
            toaster.show('Post deleted', 'success');
            onDelete(id);
        }
        else
            toaster.show('Error: could not delete post', 'error');
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
     *  Calls the POST or PUT API request for blog posts, depending 
     *  on the 'isFirst' props.
     */
    async function savePost() {
        const blogPostFormData = new FormData();
        const body: BlogPostProps = {
            id,
            date: date ?? (new Date()).toISOString(),
            text,
            title: postForm.title,
            subtitle: postForm.subtitle
        };

        Object.entries(body).forEach(([k, v]) => {
            if (v)
                blogPostFormData.append(k, v);
        });

        /**
         *  JSON stringify the array, to prevent issues with 
         *  formData converting empty arrays into empty strings
         */
        blogPostFormData.append('images', JSON.stringify(postForm.images));
    
        const response = isFirst ?
                         await fetch('?/saveBlogPost', {
                             method: 'POST',
                             body: blogPostFormData
                         }) :
                         await fetch('?/updateBlogPost', {
                             method: 'POST',
                             body: blogPostFormData
                         });
        
        const responseData = await response.json();
        switch(responseData.status) {
            case 200:
                toaster.show('Post successfully updated', 'success');
                break;
            case 201:
                toaster.show('New post successfully created', 'success');
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

<fieldset class={`fieldset ${isFirst ? "w-full" : "w-[3/10]"} bg-base-200 border border-base-300 p-4 rounded-box`}>
    <h2 class="text-xl">{ dateString }</h2>
    <label for="title" class="input text-xl w-auto">
        <input type="input" class="input input-lg"
               placeholder="Título"
               bind:value={postForm.title} />
    </label>
    <label for="subtitle" class="input text-xl w-auto">
        <input type="input" class="input input-lg" 
               placeholder="Subtítulo"
               bind:value={postForm.subtitle} />
    </label>
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
        <div class="w-full" bind:this={editorDiv}></div>
    </label>
    <h3 class="text-3xl m-4">Images</h3>
    {#if postForm.images && postForm.images.length > 0}
        {#each postForm.images as image, i}
            <ImageUploader {...image} 
                onDelete={() => deleteImage(i)}
                onUpdate={(updatedImage: Image) => updateImage(i, updatedImage)} />
        {/each}
    {/if}
    <div class="w-full">
        <button class="btn btn-primary btn-outline mt-10"
                onclick={addImage}>
                <PlusSolid />
                Nova Imagem
        </button>
    </div>
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={savePost}>Salvar</button>
        {#if !isFirst}
            <button class="btn btn-error text-white mt-10"
                    onclick={showModal}>
                <TrashSolid />
                Apagar
            </button>
        {/if}
    </div>
</fieldset>
<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Apagar postagem "{title}"</h3>
    <p class="py-4">Você tem certeza que quer continuar?</p>
    <div class="modal-action">
      <form class="flex gap-x-4" method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-error text-white"
                onclick={deletePost}>Sim</button>
        <button class="btn btn-secondary text-white">Não</button>
      </form>
    </div>
  </div>
</dialog>
