<script lang="ts">
	import type { WorksProps } from "../types/Work.types";
    import Work from "./Work.svelte";

    const { works }: WorksProps = $props();
</script>
<div class="flex flex-wrap gap-x-8 gap-y-4 mb-10">
    {#each works as work}
        <Work {...work} />
    {/each}
</div>
