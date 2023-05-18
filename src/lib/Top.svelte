<script lang="ts">
    import {onMount} from 'svelte'

    const body = document.documentElement || document.body
    const threshold = 250
    const minGap = 8

    let hidden = true
    let topButton: HTMLDivElement
    let maxGap: number

    function getButtonBottom(): string {
        const gap = body.scrollHeight - body.scrollTop - window.innerHeight
        let bottom: number

        if (gap <= 0) {
            bottom =  maxGap
        } else if (gap < maxGap) {
            bottom = maxGap - gap
        } else {
            bottom = minGap
        }

        return bottom + 'px'
    }

    onMount(async () => {
        topButton = document.getElementById('top-button') as HTMLDivElement
        maxGap = minGap + document.querySelector('footer').getBoundingClientRect().height
        dispatchEvent(new Event('resize'))
    })
</script>

<div id="top-button" class="flex justify-center items-center fixed select-none back-top-top"
     class:hidden>
    <a href={'#'}
       class="text-xs bg-green-300 px-2 py-1 text-black"
       on:click={() => {document.body.scrollIntoView()}}
    >TOP</a>
</div>

<svelte:window
    on:scroll={() => {
        if (!body) {
            return
        }
        hidden = body.scrollTop <= threshold
        topButton.style.bottom = getButtonBottom()
    }}
    on:resize={() => {
        const relative = topButton.closest('div.relative')
        if (relative) {
            const relRect = relative.getBoundingClientRect()
            topButton.style.left = (relRect.right - topButton.clientWidth) + 'px'
            topButton.style.bottom = getButtonBottom()
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
