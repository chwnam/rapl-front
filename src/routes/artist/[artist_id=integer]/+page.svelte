<script lang="ts">
    import {createQuery} from '@tanstack/svelte-query'
    import {page as storesPage} from '$app/stores'

    import {DEFAULT_TITLE} from '$lib/constants'
    import Error from '$lib/Error.svelte'
    import type {ArtistInfo} from '$lib/api'
    import {queryArtistInfo} from '$lib/api'
    import {createParam, homeUrl, navigateTo} from '$lib/utils'
    import Loading from '$lib/Loading.svelte'
    import Pagination from '$lib/Pagination.svelte'
    import DateTimeField from '$lib/DateTimeField.svelte'
    import YoutubeLinks from '$lib/YoutubeLinks.svelte'

    $: artistInfo = createQuery<ArtistInfo, Error>({
        queryKey: ['artist', $storesPage.data],
        queryFn: () => {
            return queryArtistInfo(
                $storesPage.data.artist_id,
                {
                    page: $storesPage.data.page,
                    per_page: $storesPage.data.per_page
                },
                $storesPage.url.origin
            )
        },
    })
</script>

<svelte:head>
    {#if $artistInfo.isSuccess}
        <title>{DEFAULT_TITLE} Artist Info: {$artistInfo.data.artist.artist_name}</title>
    {/if}
</svelte:head>

{#if $artistInfo.isLoading}
    <Loading/>
{:else if $artistInfo.isError}
    <Error message={$artistInfo.error.message}/>
{:else if $artistInfo.isSuccess}
    <h2 class="font-bold text-xl mb-2">Artist Information</h2>
    <section
            class="flex md:flex-row justify-start pl-4 items-center md:items-stretch"
    >
        <ul id="artist-info" class="grow-1 leading-6 md:leading-7">
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Artist Name</span>
                {$artistInfo.data.artist.artist_name}
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Total Tracks</span>
                {$artistInfo.data.total_tracks}
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Total Playback</span>
                {$artistInfo.data.total_playback}
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">First fetched</span>
                <DateTimeField value={$artistInfo.data.first_fetched}/>
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Last fetched</span>
                <DateTimeField value={$artistInfo.data.last_fetched}/>
            </li>
        </ul>
    </section>
    <div class="text-right mt-2">
        <a href={homeUrl()} class="text-sm text-green-300">&laquo; Back to Home</a>
    </div>

    <h2 class="font-bold text-xl mt-8">Fetched Songs</h2>
    <ul class="mt-2 md:pl-4 w-full mb-5">
        {#each $artistInfo.data.tracks as track}
            <li class="border border-x-0 border-t-0 border-dashed border-green-500 pt-4 pb-2.5">
                <div class="flex flex-row">
                    <div class="min-w-[76px] mr-4">
                        <img src="https:{track.art_url}?width=128&height=128&quality=low"
                             class="float-left w-[76px] h-[76px]"
                             alt="Cover of the track"
                        />
                    </div>
                    <div class="w-full">
                        <h4 class="text-lg">
                            <a href={homeUrl(`/track/${track.track_id}`)}
                               class="text-green-300">{track.title}</a>
                        </h4>
                        <div class="">Play count: {track.playback_count}</div>
                        <div class="flex justify-between md:justify-end mt-1">
                            <YoutubeLinks item={track.youtube}/>
                        </div>
                    </div>
                </div>
            </li>
        {/each}
    </ul>

    <!-- Pagination -->
    <div class="w-full text-center">
        <Pagination
                page={$storesPage.data.page}
                totalPages={$artistInfo.data ? $artistInfo.data.totalPages : 0}
                onClickPage={(page) => {
                        navigateTo(`?${createParam({page, per_page:$storesPage.data.per_page})}`)
                }}
        />
    </div>
{/if}
