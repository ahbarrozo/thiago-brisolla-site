<script lang="ts">
	import { goto } from '$app/navigation';
    import { LockSolid } from 'svelte-awesome-icons';

    let { onAuthentication } = $props();

    function scrollToSection(sectionId: string) {
        if (window.location.href.includes('admin')) 
            goto('/');
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
</script>

<div class="navbar font-bold sticky top-0 z-10 text-secondary bg-base-300 text-xl">
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <button onclick={() => scrollToSection("diario")} 
                            class="anchor font-questrial tracking-widest">
                        DIÁRIO
                    </button>
                </li>
                <li>
                    <button onclick={() => scrollToSection("bio")} 
                            class="anchor font-questrial tracking-widest">
                        SOBRE
                    </button>
                </li>
                <li>
                    <button onclick={() => scrollToSection("obra")}
                            class="anchor font-questrial tracking-widest">
                        OBRA
                    </button>
                </li>
                <li>
                    <button onclick={() => scrollToSection("agenda")}
                            class="anchor font-questrial tracking-widest">
                        AGENDA
                    </button>
                </li>
                <li>
                    <button onclick={() => scrollToSection("contato")}
                            class="anchor font-questrial tracking-widest">
                        CONTATO
                    </button>
                </li>
            </ul>
        </div>
        <a href="/" class="flex items-center gap-12">
            <span class="text-4xl font-bold text-primary">TB</span>
        </a>
    </div>        

    <div class="navbar-center hidden lg:flex lg:justify-center lg:gap-12">
        <button onclick={() => scrollToSection("diario")} class="anchor font-questrial tracking-widest">DIÁRIO</button>
        <button onclick={() => scrollToSection("bio")} class="anchor font-questrial tracking-widest">SOBRE</button>
        <button onclick={() => scrollToSection("obra")} class="anchor font-questrial tracking-widest">OBRA</button>
        <button onclick={() => scrollToSection("agenda")} class="anchor font-questrial tracking-widest">AGENDA</button>
        <button onclick={() => scrollToSection("contato")} class="anchor font-questrial tracking-widest">CONTATO</button>
    </div>

    <div class="navbar-end">
        <div class="flex items-center gap-4">
            <button class="btn-icon variant-filled"
                    onclick={onAuthentication}>
                <LockSolid size="14" />
            </button>
        </div>
    </div>
</div>

