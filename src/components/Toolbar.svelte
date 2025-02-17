<script lang="ts">
  import { InstagramBrands } from 'svelte-awesome-icons';
</script>

<div class="navbar font-bold text-secondary text-xl">
    <div class="navbar-start">
        <a href="/" class="flex items-center gap-12">
            <span class="text-4xl font-bold text-primary hover:text-blue-700">Thiago Brisolla</span>
        </a>
    </div>        

    <div class="navbar-center sm:hidden lg:flex lg:justify-center lg:gap-12">
        <a href="/" class="anchor font-questrial tracking-widest transition-colors">HOME</a>
        <a href="/#diario" class="anchor font-questrial tracking-widest transition-colors">DIÁRIO</a>
        <a href="/#bio" class="anchor font-questrial tracking-widest transition-colors">SOBRE</a>
        <a href="/#obra" class="anchor font-questrial tracking-widest transition-colors">OBRA</a>
        <a href="/#agenda" class="anchor font-questrial tracking-widest transition-colors">AGENDA</a>
        <a href="/#contato" class="anchor font-questrial tracking-widest transition-colors">CONTATO</a>
    </div>

    <div class="navbar-end">
        <div class="flex items-center gap-4">
            <button type="button" class="btn-icon variant-filled">
                <InstagramBrands />
            </button>
        </div>
    </div>
</div>

