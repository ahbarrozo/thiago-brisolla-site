<script lang="ts">
    import type { Event } from 'src/types/Event.types';
	import { TrashSolid } from 'svelte-awesome-icons';
    import { onMount } from 'svelte';
	import { toaster } from 'src/stores/toaster.store';

    let { id, dates, link, location, name }: Event = $props();
    let modal: HTMLDialogElement;
    let cally;
    let calendar = $state(dates.join(" "));
    let calendarRef = $state<HTMLInputElement | null>(null);
    let inputRef = $state<HTMLInputElement | null>(null);
    let showCalendar = $state(false);

    // importing module on the client-side
    onMount(async () => {
        cally = await import("cally");
    });

    /* Add event listener separately on a non async function to be 
     * able to return the destructor
     */
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside); };
    });

    /** 
     *  Update the calendar variable when dates are selected
     *  The exact event properties depend on the cally library's 
     *  implementation
     */
    function handleClickInside() {
        if (calendarRef)
            calendar = calendarRef.value;
    }

    /**
     *  Check if click event target does not contain neither the 
     *  date input, nor the calendar element. If so, close the 
     *  calendar.
     *
     *  @param event - MouseEvent : click event
     */
    function handleClickOutside(event: MouseEvent) {
        if (showCalendar && calendarRef && inputRef &&
            !calendarRef.contains(event.target as Node) &&
            !inputRef.contains(event.target as Node))
            showCalendar = false;
    }

    /**
     *  Creates a POST request body and send a query to save an 
     *  event
     */
    function saveEvent() {
        const body: Event = {
            dates: calendar.split(' '),
            link,
            location,
            name
        };

        console.log(body);
        toaster.show('Trying to save event', 'success');
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

<fieldset class={`fieldset w-full bg-base-200 border border-base-300 mb-4 p-4 rounded-box`}>
    <div class="flex flex-row flex-wrap gap-x-4 gap-y-8 w-full">
        <label for="name" class="input text-xl w-[20.28vw]">
            <input type="input" class="input input-lg" value={name} placeholder="Título" />
        </label>
        <label for="location" class="input text-xl w-[30vw]">
            <input type="input" class="input input-lg" value={location} placeholder="Local" />
        </label>
        <label for="link" class="input text-xl w-[28.66vw]">
            <input type="input" class="input input-lg" value={link} placeholder="Link" />
        </label>
        <label for="date" class="input text-xl w-full">
            <input type="input"
                   class="input input-lg"
                   value={calendar.split(' ').join(', ')}
                   placeholder="Datas"
                   bind:this={inputRef}
                   onfocus={() => showCalendar = true }
            />
            {#if showCalendar}
                <div class="card w-180 p-10">
                    <!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
                    <calendar-multi class="w-full"
                                    months={2}
                                    bind:this={calendarRef}
                                    value={calendar}
                                    onclick={handleClickInside}>
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
                            <calendar-month offset={1}></calendar-month>
                        </div>
                    </calendar-multi>
                </div>
            {/if}
        </label>
    </div>
    <div class="flex justify-between">
        <button class="btn btn-primary mt-10"
                onclick={saveEvent}>Salvar</button>
        <button class="btn btn-error text-white mt-10"
                onclick={showModal}>
            <TrashSolid />
            Apagar
        </button>
    </div>
</fieldset>
<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Apagar evento</h3>
        <p class="py-4">Você tem certeza que quer continuar?</p>
        <div class="modal-action">
            <form class="flex gap-x-4" method="dialog">
                <button class="btn btn-error text-white">Sim</button>
                <button class="btn btn-secondary text-white">Não</button>
            </form>
        </div>
    </div>
</dialog>
