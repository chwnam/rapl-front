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

    import youtube_music from '$lib/assets/youtube-music.svg'
    import youtube from '$lib/assets/youtube.svg'

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

<div class="w-full md:w-10/12 lg:w-6/12 mt-8 mb-1 lg:mt-10 lg:mb-2 mx-auto">
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
                     alt="Cover art of {$trackInfo.data.track.artist_name} - {$trackInfo.data.track.title}">
            </figure>
            <ul id="track-info" class="mt-4 md:mt-0 grow-1 leading-6 md:leading-7">
                <li>
                    <span class="float-left font-semibold min-w-[8rem]">Title</span>
                    {$trackInfo.data.track.title}
                </li>
                <li>
                    <span class="float-left font-semibold min-w-[8rem]">Artist</span>
                    {$trackInfo.data.track.artist_name}
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
                <li>
                    <span class="float-left font-semibold min-w-[8rem]">Youtube Music</span>
                    <div>
                        <img src={youtube_music}
                             type="image/svg+xml"
                             class="inline-flex me-0.5"
                             alt="Youtube music icon"
                             width="18"
                             height="18"
                        />
                        <a href={$trackInfo.data.youtube.music.direct}
                           class="text-sm md:text-base me-1 text-green-300"
                        >Direct</a> |
                        <a href={$trackInfo.data.youtube.music.search}
                           class="text-sm md:text-base ms-1 text-green-300"
                        >Search</a>
                    </div>
                </li>
                <li>
                    <span class="float-left font-semibold min-w-[8rem]">Youtube Video</span>
                    <img src={youtube}
                         type="image/svg+xml"
                         class="inline-flex me-0.5"
                         alt="Youtube music icon"
                         width="18"
                         height="18"
                    />
                    <a href={$trackInfo.data.youtube.video.direct}
                       class="text-sm md:text-base me-1 text-green-300"
                    >Direct</a> |
                    <a href={$trackInfo.data.youtube.video.search}
                       class="text-sm md:text-base ms-1 text-green-300"
                    >Search</a>
                </li>
            </ul>
        </section>
        <div class="text-right mt-2">
            <a href={homeUrl()} class="text-sm mt-4 text-green-300">&laquo; Back to Home</a>
        </div>

        <h2 class="font-bold text-xl mt-8">Recently Played</h2>
        <ul class="mt-2 md:pl-4 w-full md:w-8/12 text-sm mb-5">
            {#each $trackInfo.data.history as item}
                <li>
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
</div>
