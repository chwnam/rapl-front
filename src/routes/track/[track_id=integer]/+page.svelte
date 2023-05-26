<script lang="ts">
    import {createQuery} from '@tanstack/svelte-query'
    import {page as storesPage} from '$app/stores'

    import Error from '$lib/Error.svelte'
    import {DEFAULT_TITLE} from '$lib/constants'
    import type {TrackInfo} from '$lib/api'
    import {queryTrackInfo} from '$lib/api'
    import {createParam, formatLength, getChannelName, homeUrl, navigateTo} from '$lib/utils'
    import Pagination from '$lib/Pagination.svelte'
    import Loading from '$lib/Loading.svelte'
    import DateTimeField from '$lib/DateTimeField.svelte'
    import YoutubeLinks from '$lib/YoutubeLinks.svelte'

    $: trackInfo = createQuery<TrackInfo, Error>({
        queryKey: ['track', $storesPage.data],
        queryFn: () => {
            return queryTrackInfo(
                $storesPage.data.track_id,
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
    {#if $trackInfo.isSuccess}
        <title>{DEFAULT_TITLE} Track Info: {$trackInfo.data.track.artist_name} - {$trackInfo.data.track.title}</title>
    {/if}
</svelte:head>

{#if $trackInfo.isLoading}
    <Loading/>
{:else if $trackInfo.isError}
    <Error message={$trackInfo.error.message}/>
{:else if $trackInfo.isSuccess}
    <h2 class="font-bold text-xl mb-2">Track Information</h2>
    <section
            class="flex flex-col md:pl-4 md:flex-row justify-center md:justify-start items-center md:items-stretch">
        <figure class="mt-2 md:mr-8 grow-1 w-[192px] h-[192px]">
            <img src={`https:${$trackInfo.data.track.art_url}?width=512&height=512&quality=mid`}
                 class=""
                 alt="Cover art of {$trackInfo.data.artist_name} - {$trackInfo.data.title}">
        </figure>
        <ul id="track-info" class="mt-4 md:mt-0 grow-1 leading-6 md:leading-7">
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Title</span>
                {$trackInfo.data.track.title}
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Artist</span>
                <a href={homeUrl(`artist/${$trackInfo.data.track.artist_id}`)} class="text-green-300">{$trackInfo.data.track.artist_name}</a>
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Length</span>
                {formatLength($trackInfo.data.track.length)}
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">First fetched</span>
                <DateTimeField value={$trackInfo.data.first_fetched}/>
            </li>
            <li>
                <span class="float-left font-semibold min-w-[8rem]">Play count</span>
                {$trackInfo.data.total}
            </li>
        </ul>
    </section>
    <div class="flex justify-evenly md:justify-end mt-5 mb-2">
        <YoutubeLinks item={$trackInfo.data.track.youtube} />
    </div>
    <div class="text-right mt-2">
        <a href={homeUrl()} class="text-sm mt-4 text-green-300">&laquo; Back to Home</a>
    </div>

    <h2 class="font-bold text-xl mt-8">Recently Played</h2>
    <ul class="mt-2 md:pl-4 w-full md:w-8/12 text-sm mb-5">
        {#each $trackInfo.data.history as item}
            <li class="mt-2">
                <div class="flex flex-row justify-between">
                    <DateTimeField value={item.started}/>
                    <div>via <strong>{getChannelName(item.channel_id)}</strong> channel.</div>
                </div>
            </li>
        {/each}
    </ul>

    <!-- Pagination -->
    <div class="w-full text-center">
        <Pagination
                page={$storesPage.data.page}
                totalPages={$trackInfo.data ?$trackInfo.data.totalPages : 0}
                onClickPage={(page) => {
                        navigateTo(`?${createParam({page, per_page:$storesPage.data.per_page})}`)
                    }}
        />
    </div>
{/if}
