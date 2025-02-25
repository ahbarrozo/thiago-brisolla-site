<script lang="ts">
	import '../app.css';
    import Toolbar from '../components/Toolbar.svelte';
	let { children } = $props();
</script>

<div class="app h-full">
    <div class="theme-skeleton h-full">
        <Toolbar />
        <main class="flex-1 px-4 md:px-12 lg:px-64">
            {@render children()}
        </main>
    </div>
</div>
