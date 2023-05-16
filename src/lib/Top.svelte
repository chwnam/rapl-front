<script lang="ts">
    const threshold = 250

    let hidden = true

    let value = 0
</script>

<div id="top-button" class="flex justify-center items-center fixed bottom-[4.125rem] select-none back-top-top"
     class:hidden>
    <a href={'#'}
       class="text-xs bg-green-300 px-2 py-1 text-black"
       on:click={() => {document.body.scrollIntoView()}}
    >TOP</a>
</div>

<svelte:window
    on:scroll={() => {
        const target = document.documentElement || document.body || false

        if (!target) {
            return
        }

        hidden = target.scrollTop <= threshold
    }}
    on:resize={() => {
        const button = document.getElementById('top-button'),
            relative = button.closest('div.relative')

        if (relative) {
            const relRect = relative.getBoundingClientRect()
            button.style.left = (relRect.right - button.clientWidth)+ 'px'
        }
    }}
/>

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
