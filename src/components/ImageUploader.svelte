<script lang="ts">
    import { type Image } from 'src/types/Image.types';

    let {
        id,
        title,
        description,
        path
    }: Image = $props();

    let imageThumbnail = $state('');
    let uploadedImage = $state();

    function handleFileChange(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
    
        if (file) {
            path = file.name;
            uploadedImage = file;
      
        // Create a local URL for preview
        imageThumbnail = URL.createObjectURL(file);

        // If you need to upload to your frontend server
        uploadToServer(file);
        }
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
                const data = await response.json();
                console.log('Upload successful:', data);
                // You might want to store the server's response here
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

</script>

<fieldset class="fieldset">
    <label for="title" class="input text-xl w-auto">
        <input type="input" class="input input-lg"
               placeholder="Título"
               bind:value={title} />
    </label>
    <label for="subtitle" class="input text-xl w-auto">
        <input type="input" class="input input-lg" 
               placeholder="Descrição"
               bind:value={description} />
    </label>
    <input type="file"
           class="file-input file-input-ghost"
           accept="image/*"
           onchange={handleFileChange}
            />
    {#if imageThumbnail}
        <div class="preview">
            <img src={imageThumbnail} alt="Preview" />
        </div>
    {/if}
</fieldset>
