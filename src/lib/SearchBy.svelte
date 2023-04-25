<script lang="ts">
    import type {PlayItem} from '$lib/api'

    export let artistId: number
    export let trackId: number
    export let items: PlayItem[] | undefined
</script>

<p class="my-2 text-xs">
    {#if artistId}
        Search by artist "{items && items.length ? items[0].artist_name : `id ${artistId}`}"
    {:else if trackId}
        Search by track "{items && items.length ? items[0].title : `id ${trackId}`}"
    {/if}
</p>
