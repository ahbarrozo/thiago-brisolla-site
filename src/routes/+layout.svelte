<script lang="ts">
	import 'src/app.css';
    import Toaster from 'src/components/Toaster.svelte'
    import Toolbar from 'src/components/Toolbar.svelte';
	let { children } = $props();
</script>

<div class="app h-full">
    <div class="theme-skeleton h-full">
        <Toolbar />
        {@render children()}
        <footer class="footer flex
                       justify-center 
                       sm:footer-horizontal
                       text-neutral-content
                       p-10 bg-base-300">
            © Copyright Thiago Brisolla - Todos os direitos reservados
        </footer>
        <Toaster />
    </div>
</div>
