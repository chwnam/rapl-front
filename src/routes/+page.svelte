<script lang="ts">
    import {createQuery} from '@tanstack/svelte-query'
    import {page as storesPage} from '$app/stores'
    import type {PlaylistQueryResult} from '$lib/api'
    import {queryPlaylist} from '$lib/api'

    import Pagination from '$lib/Pagination.svelte'
    import PlaylistItem from '$lib/PlaylistItem.svelte'
    import QueryStat from '$lib/QueryStat.svelte'
    import Search from '$lib/Search.svelte'
    import Loading from '$lib/Loading.svelte'
    import Error from '$lib/Error.svelte'
    import Channels from '$lib/Channels.svelte'
    import SearchBy from '$lib/SearchBy.svelte'

    const origin = $storesPage.url.origin

    let page = parseInt($storesPage.url.searchParams.get('page') ?? '1')

    $: params = $storesPage.url.searchParams
    $: artistId = parseInt(params.get('artist_id') ?? '0')
    $: trackId = parseInt(params.get('track_id') ?? '0')
    $: playlist = createQuery<PlaylistQueryResult, Error>({
        queryKey: ['playlist', params],
        queryFn: () => {
            return queryPlaylist({origin, params})
        },
    })
</script>

<svelte:head>
    <title>Metal Radio Playlist</title>
</svelte:head>

<main class="min-h-screen bg-black m-5">
    <div class="container mx-auto">
        <h1 class="font-sans font-bold text-2xl xl:text-3xl text-center">
            Metal Radio Playlist
        </h1>
        <!-- Topmost tool area -->
        <div class="w-full md:w-10/12 lg:w-6/12 mt-8 mb-1 lg:mt-10 lg:mb-2 mx-auto">
            <Search bind:page/>
            <QueryStat
                    page={page}
                    total={$playlist.data ? $playlist.data.total : 0}
                    totalPages={$playlist.data ? $playlist.data.totalPages : 0}
                    timeSpent={$playlist.data ? $playlist.data.timeSpent : 0}
            />

            <SearchBy
                    artistId={artistId}
                    trackId={trackId}
                    items={$playlist.data?.items}
            />

            <Channels bind:page/>

            {#if $playlist.isLoading}
                <Loading/>
            {:else if $playlist.isError}
                <Error message={$playlist.error.message}/>
            {/if}
        </div>

        {#if $playlist.isSuccess}
            <ul class="w-full md:w-10/12 lg:w-6/12 mb-3 mx-auto">
                {#if $playlist.data}
                    {#each $playlist.data.items as item}
                        <li class="border border-x-0 border-t-0 border-dashed border-green-500 pt-4 pb-2.5">
                            <PlaylistItem item={item} bind:page/>
                        </li>
                    {/each}
                {/if}
            </ul>
            <!-- Pagination -->
            <div class="w-full text-center">
                <Pagination
                        bind:page
                        totalPages={$playlist.data? $playlist.data.totalPages: 0}
                />
            </div>
        {/if}
    </div>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.black");
        color: theme("colors.green.500");
    }
</style>
