<script lang="ts">
    import { onMount } from 'svelte';
    import { type Readable } from 'svelte/store';
    import { createEditor } from 'svelte-tiptap';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    import { type Album } from 'src/types/Album.types';
	import { TrashSolid } from 'svelte-awesome-icons';
	import { toaster } from 'src/stores/toaster.store';

    interface Button {
        active: () => boolean;
        command: () => boolean;
        content: string;
        name: string;
        type: 'block' | 'inline'; 
    }

    let {
        date,
        description,
        image,
        title,
        isNew
    }: Album & { isNew?: boolean } = $props();

    let cally;
    let calendar = $state(date);
    let calendarRef = $state<HTMLInputElement | null>(null);
    let editor = $state() as Readable<Editor>;
    let editorDiv: HTMLElement;
    let inputRef = $state<HTMLInputElement | null>(null);
    let modal: HTMLDialogElement;    
    let menuItems: Button[] = $state([]);
    let showCalendar = $state(false);

    onMount(async () => {
        cally = await import("cally");
    })

    onMount(() => {
        editor = createEditor({
            extensions: [StarterKit],
            element: editorDiv,
            content: description,
            onUpdate: ({ editor }) => {
                description = editor.getHTML();
            },
            editorProps: {
                attributes: {
                    class: `rounded-b-md p-8 outline-hidden ${isNew ? "w-full" : "w-150"}`
                }
            }
        });

        document.addEventListener('click', handleClickOutside);

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

        return () => { document.removeEventListener('click', handleClickOutside); };
    });

    /** 
     *  Update the calendar variable when dates are selected
     *  The exact event properties depend on the cally library's implementation
     */
    function handleClickInside() {
        if (calendarRef)
            calendar = calendarRef.value;
    }

    function handleClickOutside(event: MouseEvent) {
        if (showCalendar && calendarRef && inputRef &&
            !calendarRef.contains(event.target as Node) &&
            !inputRef.contains(event.target as Node))
            showCalendar = false;
    }

    function saveAlbum() {
        const body: Album = {
            title,
            date,
            description,
        };

        toaster.show('Trying to save album');
        console.log(body);
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

<fieldset class={`fieldset ${isNew ? "w-full" : "w-[4/9]"} bg-base-200 border border-base-300 p-4 rounded-box`}>
    <div class="flex flex-row gap-x-4">
        <label for="title" class="input text-xl w-full">
            <input type="input" class="input input-lg" value={title} placeholder="Título" />
        </label>
        <label for="date" class="input text-xl w-100 z-50">
            <input type="input"
                   class="input input-lg"
                   value={calendar}
                   placeholder="Data de lançamento"
                   bind:this={inputRef}
                   onfocus={() => showCalendar = true } 
            />
            {#if showCalendar}
                <div class="card w-180 p-10">
                    <!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
                    <calendar-date class="w-full z-50"
                                    months={1}
                                    bind:this={calendarRef}
                                    value={calendar}
                                    onclick={handleClickInside}
                    >
                        <svg aria-label="Previous"
                             class="calendar-nav-button"
                             slot="previous"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                            <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                        </svg>
                        <svg aria-label="Next"
                             class="calendar-nav-button"
                             slot="next"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24">
                            <path d="M8.25 4.5 15.75 12l-7.5 7.5"></path>
                        </svg>
                        <div class="flex flex-row gap-x-24">
                            <calendar-month></calendar-month>
                        </div>
                    </calendar-date>
                </div>
            {/if}
        </label>
    </div>
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
   
    <h3 class="text-3xl m-4">Image</h3>
    <label for="images" class="input flex flex-col validator text-xl w-auto">
        <p>{image}</p>
    </label> 
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={saveAlbum}>Salvar</button>
        {#if !isNew}
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
        <button class="btn btn-error text-white">Sim</button>
        <button class="btn btn-secondary text-white">Não</button>
      </form>
    </div>
  </div>
</dialog>
