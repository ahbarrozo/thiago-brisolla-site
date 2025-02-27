<script lang="ts">
    import { onMount } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';

    import { type BlogPostProps } from 'src/types/BlogPost.types';

    let {
        date,
        images,
        subtitle,
        text,
        title,
        isFirst
    }: BlogPostProps = $props();

    const dateFormat = new Intl.DateTimeFormat('pt-BR', 
        { day: '2-digit', month: 'long', year: 'numeric' });
    const dateString = $derived(dateFormat.format(new Date(date)));

    let editor: Editor | null = $state(null);
    let editorDiv: HTMLElement;

    onMount(() => {
        editor = new Editor({
            extensions: [StarterKit],
            element: editorDiv,
            content: text,
            onUpdate: ({ editor }) => {
                text = editor.getHTML();
            },
            editorProps: {
                attributes: {
                    class: 'border-2 border-black rounded-b-md p-3 outline-hidden w-90'
                }
            }
        })
    });
</script>

<fieldset class="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box">

    <label for="title" class="input validator text-xl w-auto">
        <input type="input" class="input input-lg" 
               required value={title} 
               pattern="[A-Za-z][A-Za-z0-9\-]*" 
               minlength="1" maxlength="100" 
               title="Only letters, numbers or dash" />
    </label>
    <div class="validator-hint hidden">O título deve ter entre 1 e 100 caracteres</div>

    <label for="subtitle" class="input validator text-xl w-auto">
        <input type="input" class="input input-lg" 
               placeholder="Subtítulo"
               value={subtitle}
               pattern="[A-Za-z][A-Za-z0-9\-]*" 
               maxlength="100" 
               title="Only letters, numbers or dash" />
    </label>
    <div class="validator-hint hidden">O subtítulo deve ter no máximo 100 caracteres</div>

    <label for="mail" class="input validator text-xl w-auto">
        {#if editor}
    	    <button onclick={() => editor!.chain().focus().toggleHeading({ level: 1 }).run()}
    		        class:active={editor.isActive('heading', { level: 1 })}>
	    	    H1
    	    </button>
    	    <button onclick={() => editor!.chain().focus().toggleHeading({ level: 2 })}
    		        class:active={editor.isActive('heading', { level: 2 })}>
    		    H2
    	    </button>    
    		<button onclick={() => editor!.chain().focus().setParagraph().run()}
    		        class:active={editor.isActive('paragraph')}>
	    	    P
    	    </button>
    	    <button onclick={() => editor!.chain().focus().toggleBold().run()}
	    	        class:active={editor.isActive('paragraph')}>
	    	    B
    	    </button>
	        <button onclick={() => editor!.chain().focus().toggleItalic().run()}
    	    	    class:active={editor.isActive('paragraph')}>
		        i
	        </button>
        {/if}

        <div bind:this={editorDiv}></div>
    </label>
    <div class="validator-hint hidden">Insira um email válido</div>
    <button class="btn">Enviar</button>
</fieldset>

