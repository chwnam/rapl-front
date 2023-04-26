<script lang="ts">
    const threshold = 150

    let hidden = true
</script>

<div class="flex justify-center items-center fixed bottom-5 right-5 select-none back-top-top" class:hidden>
    <a href={'#'}
       class="text-xs bg-green-300 px-2 py-1 text-black"
       on:click={() => {document.body.scrollIntoView()}}
    >TOP</a>
</div>

<svelte:window on:scroll={() => {
    const target = document.documentElement || document.body || false

    if (!target) {
        return
    }

    hidden = target.scrollTop <= threshold
}}/>

<style>
    .back-top-top {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.5s, visibility 0.5s;
    }

    .back-top-top.hidden {
        display: unset;
        opacity: 0;
        visibility: hidden;
    }
</style>
