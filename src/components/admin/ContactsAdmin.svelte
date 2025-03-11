<script lang="ts">
	import type { Contact, ContactProps } from "src/types/Contact.types";
	import type { SocialMedia } from "src/types/SocialMedia.types";

    import ContactAdmin from "./ContactAdmin.svelte";
    import SocialMediaAdmin from "./SocialMediaAdmin.svelte";

    const { contacts, socialMedia }: ContactProps = $props();

     const emptyContact: Contact = {
        address: '',
        contact: '',
        mail: '',
        name: '',
        phone: '',
    };

    const emptySocialMedia: SocialMedia = {
        name: '',
        link: '',
    };

    let contactsList: Contact[] = $state(contacts);
    let socialMediaList: SocialMedia[] = $state(socialMedia);
     
    function displayNewContact() {
        contactsList = [...contactsList, {...emptyContact}];
    }

    function displayNewSocialMedia() {
        socialMediaList = [...socialMediaList, {...emptySocialMedia}];
    }

</script>

<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    <h2 class="text-3xl m-4">Contatos</h2>
    {#each contactsList as contact, i (i) }
        <ContactAdmin { ...contact } />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewContact}>Novo contato</button>
</div>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    <h2 class="text-3xl m-4">Mídias sociais</h2>
    {#each socialMediaList as socialMedia, i (i) }
        <SocialMediaAdmin { ...socialMedia } />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewSocialMedia}>Nova mídia social</button>
</div>
