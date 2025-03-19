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

    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  albums by ID for deleted albums
     *
     *  @param id : number ID of the deleted contact
     */
    function onDeleteContacts(id: number) {
        contactsList = contactsList.filter(contact => contact.id !== id);
    }

    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  albums by ID for deleted social media
     *
     *  @param id : number ID of the deleted album
     */
    function onDeleteSocialMedia(id: number) {
        socialMediaList = socialMediaList.filter(event => event.id !== id);
    }
</script>

<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    <h2 class="text-3xl m-4">Contatos</h2>
    {#each contactsList as contact (contact.id) }
        <ContactAdmin { ...contact } onDelete={() => onDeleteContacts(contact.id!)} />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewContact}>Novo contato</button>
</div>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    <h2 class="text-3xl m-4">Mídias sociais</h2>
    {#each socialMediaList as socialMedia (socialMedia.id) }
        <SocialMediaAdmin { ...socialMedia } onDelete={() => onDeleteSocialMedia(socialMedia.id!)} />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewSocialMedia}>Nova mídia social</button>
</div>
