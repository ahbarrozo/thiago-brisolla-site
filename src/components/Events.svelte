<script lang="ts">
	import { PUBLIC_LOCALE } from "$env/static/public";
	import type { Event } from "src/types/Event.types";

    interface EventsProps {
        events: Event[];
    }

    const { events }: EventsProps = $props();
    const listEvents = events.reduce((acc, event) => {
        event.dates.forEach(date => {
            const dateFormat = new Intl.DateTimeFormat(PUBLIC_LOCALE, 
                { day: '2-digit', month: 'long', year: 'numeric' });
            const dateString = dateFormat.format(new Date(date));
            const day = dateString.slice(0, 2);
            const month = dateString.slice(6, 9).toUpperCase();
            acc.push({
                day,
                month,
                year: date.slice(0, 4),
                location: event.location,
                name: event.name,
                link: event.link
            });
        });
        return acc;
    }, [] as Array<{ day: string; month: string; year: string; name: string; location: string; link?: string }>);
    
    function openLink(link: string | undefined) {
        window.open(link, '_blank');
    }

</script>
<ul class="list bg-base-100 rounded-box shadow-md"> 
    {#each listEvents as event}    
        <li class="list-row">
            <div>
                <div class="text-4xl font-thin opacity-30 tabular-nums">{event.day}</div>
                <div class="text-xl font-thin opacity-30 tabular-nums">{event.month}</div>
            </div>
            <div class="list-col-grow ml-4 pt-2">
                <div class="text-xl">{event.name}</div>
                <div class="uppercase font-semibold opacity-60">{event.location}</div>
            </div>

            {#if event.link}
                <button class="btn btn-primary mt-4 mr-4" onclick={() => openLink(event.link)}>Ingressos</button>
            {/if}
        </li>
    {/each} 
</ul>
