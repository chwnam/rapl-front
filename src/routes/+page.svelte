<script lang="ts">
    import {createQuery} from '@tanstack/svelte-query'
    import {page as storesPage} from '$app/stores'
    import {queryPlaylist} from '$lib/api'
    import type {QueryResult} from '$lib/api'

    import Error from '$lib/Error.svelte'
    import Pagination from '$lib/Pagination.svelte'
    import PlaylistItem from '$lib/PlaylistItem.svelte'
    import QueryStat from '$lib/QueryStat.svelte'
    import Search from '$lib/Search.svelte'
    import Loading from '$lib/Loading.svelte'
    import Channels from '$lib/Channels.svelte'
    import SearchBy from '$lib/SearchBy.svelte'
    import {createParam, navigateTo} from '$lib/utils'

    $: playlist = createQuery<QueryResult<PlaylistItem>, Error>({
        queryKey: ['playlist', $storesPage.data],
        queryFn: () => queryPlaylist({...$storesPage.data}, $storesPage.url.origin),
    })
</script>

<svelte:head>
    <title>Metal Radio Playlist</title>
</svelte:head>

<!-- Topmost tool area -->
<Search/>

<QueryStat
        page={$storesPage.data.page}
        total={$playlist.data ? $playlist.data.total : 0}
        totalPages={$playlist.data ? $playlist.data.totalPages : 0}
        timeSpent={$playlist.data ? $playlist.data.timeSpent : 0}
/>

<SearchBy
        artistId={$storesPage.data.artist_id}
        trackId={$storesPage.data.track_id}
        search={$storesPage.data.search}
        items={$playlist.data ? $playlist.data.items : []}
/>

<Channels params={$storesPage.data}/>

{#if $playlist.isLoading}
    <Loading/>
{:else if $playlist.isError}
    <Error message={$playlist.error.message}/>
{/if}

{#if $playlist.isSuccess}
    <ul class="mb-5">
        {#if $playlist.data}
            {#each $playlist.data.items as item}
                <li class="border border-x-0 border-t-0 border-dashed border-green-500 pb-2.5">
                    <PlaylistItem item={item}/>
                </li>
            {/each}
        {/if}
    </ul>
    <!-- Pagination -->
    <div class="w-full text-center">
        <Pagination
                page={$storesPage.data.page}
                totalPages={$playlist.data ? $playlist.data.totalPages : 0}
                onClickPage={(page) => {
                    navigateTo(`?${createParam({...$storesPage.data, page})}`, 'app:page')
                }}
        />
    </div>
{/if}
