<script lang="ts">
    import { type Image } from 'src/types/Image.types';
	import { TrashSolid } from 'svelte-awesome-icons';

    let {
        id,
        title,
        description,
        path,
        onDelete,
        onUpdate
    }: Image & { onDelete: Function, onUpdate: Function }= $props();

    let imageThumbnail = $state(path ?? '');
    let uploadedImage = $state();

    function handleFileChange(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
    
        if (file) {
            path = file.name;
            uploadedImage = file;
      
            // Create a local URL for preview
            imageThumbnail = URL.createObjectURL(file);
            uploadToServer(file);
        }
    }

    /** Function to parse path to file. Checks if prefix 
     *  in file is correct (i.e. /images/)
     */
    function parsePath(filePath: string) {
        return filePath.slice(0, 9) === '/images/' ?
               filePath : '/images/' + filePath; 
    }

    // Function to upload file to server
    async function uploadToServer(file: File) {
        try {
            const formData = new FormData();
            formData.append('image', file);
      
            const response = await fetch('?/uploadImage', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // call parent function to update image array
                onUpdate({ title, path: parsePath(path), description }); 
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

</script>

<fieldset class="fieldset mb-8">
    <label for="title" class="input text-xl w-auto">
        <input type="input" class="input input-lg"
               placeholder="Título"
               onchange={() => onUpdate({ title, path, description })}
               bind:value={title} />
    </label>
    <label for="subtitle" class="input text-xl w-auto">
        <input type="input" class="input input-lg" 
               placeholder="Descrição"
               onchange={() => onUpdate({ title, path, description })}
               bind:value={description} />
    </label>
    <div class="preview flex flex-row items-center">
        {#if path && !imageThumbnail}
            <span class="badge badge-primary truncate">{path.replace('/images/', '')}</span>
        {/if}
        <input type="file"
               class="file-input file-input-ghost"
               accept="image/*"
               onchange={handleFileChange}
            />
        {#if imageThumbnail}
            <img src={imageThumbnail} 
                 alt="Preview"
                 class="object-scale-down max-h-36"/>
        {/if}
    </div>
    <div class="flex justify-end">
            <button class="btn btn-xs btn-outline btn-error text-white mt-10"
                    onclick={() => onDelete()}>
                <TrashSolid size="16" />
                Remover
            </button>
    </div>
</fieldset>
