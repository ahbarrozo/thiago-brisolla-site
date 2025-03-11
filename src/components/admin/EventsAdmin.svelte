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

</script>
<div class="gap-x-8 gap-y-4 mb-10 text-justify text-lg">
    {#each eventsList as event, i (i) }
        <EventAdmin { ...event } />
    {/each}
    <button class="btn btn-primary w-full" onclick={displayNewEvent}>Novo evento</button>
</div>
