<script lang="ts">
	import type { Event, EventsProps } from "src/types/Event.types";
	import EventAdmin from "./EventAdmin.svelte";

    const { events }: EventsProps = $props();
    const emptyEvent: Event = {
        dates: [],
        link: '',
        location: '',
        name: '',
    };

    let eventsList: Event[] = $state(events)
    
    function displayNewEvent() {
        eventsList = [...eventsList, {...emptyEvent}];
    }
    
    /**
     *  Function to be called upon an onDelete event is 
     *  triggered on the child component. It filters the 
     *  albums by ID for deleted albums
     *
     *  @param id : number ID of the deleted album
     */
    function onDelete(id: number) {
        eventsList = eventsList.filter(event => event.id !== id);
    }
</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each eventsList as event (event.id) }
        <EventAdmin { ...event } onDelete={() => onDelete(event.id!)} />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewEvent}>Novo evento</button>
</div>
