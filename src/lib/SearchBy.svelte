<script lang="ts">
    import type {PlaylistItem} from '$lib/api'
    import {navigateTo} from '$lib/utils'

    export let artistId: number
    export let trackId: number
    export let search: string
    export let items: PlaylistItem[] | undefined
</script>

<p class="my-2 text-xs">
    {#if artistId}
        Search by artist "{items && items.length ? items[0].artist_name : `id ${artistId}`}"
    {:else if trackId}
        Search by track "{items && items.length ? items[0].title : `id ${trackId}`}"
    {:else if search.length}
        Search by keyword "{search}"
    {/if}

    {#if artistId || trackId || search.length}
        <a href={'#'}
           class="ms-3 underline text-green-300"
           on:click={(e) => {
               e.preventDefault()
               navigateTo({
                    artist_id: 0,
                    channel_id: 0,
                    page:1,
                    search:'',
                    track_id: 0,
               })
           }}
        >Clear search</a>
    {/if}
</p>
