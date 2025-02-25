<script lang="ts">
    import { InstagramBrands } from 'svelte-awesome-icons';
  
    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
</script>

<div class="navbar font-bold text-secondary text-xl">
    <div class="navbar-start">
        <a href="/" class="flex items-center gap-12">
            <span class="text-4xl font-bold text-primary hover:text-blue-700">Thiago Brisolla</span>
        </a>
    </div>        

    <div class="navbar-center sm:hidden lg:flex lg:justify-center lg:gap-12">
        <a href="/" class="anchor font-questrial tracking-widest transition-colors">HOME</a>
        <button on:click={() => scrollToSection("diario")} class="anchor font-questrial tracking-widest transition-colors">DIÁRIO</button>
        <button on:click={() => scrollToSection("bio")} class="anchor cursor-pointer font-questrial tracking-widest transition-colors">SOBRE</button>
        <button on:click={() => scrollToSection("obra")} class="anchor font-questrial tracking-widest transition-colors">OBRA</button>
        <button on:click={() => scrollToSection("agenda")} class="anchor font-questrial tracking-widest transition-colors">AGENDA</button>
        <button on:click={() => scrollToSection("contato")} class="anchor font-questrial tracking-widest transition-colors">CONTATO</button>
    </div>

    <div class="navbar-end">
        <div class="flex items-center gap-4">
            <button type="button" class="btn-icon variant-filled">
                <InstagramBrands />
            </button>
        </div>
    </div>
</div>

