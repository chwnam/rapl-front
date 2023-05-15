<script lang="ts">
    import {createQuery} from '@tanstack/svelte-query'
    import {page as storesPage} from '$app/stores'

    import {queryTrackInfo} from '$lib/api'
    import Error from '$lib/Error.svelte'
    import Pagination from '$lib/Pagination.svelte'
    import type {QueryResult, TrackInfo} from '$lib/api'

    $: trackInfo = createQuery<QueryResult<TrackInfo>, Error>({
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
    <title>Metal Radio Playlist Track Info: In Flames - Land of Confusion </title>
</svelte:head>

<div class="w-full md:w-10/12 lg:w-6/12 mt-8 mb-1 lg:mt-10 lg:mb-2 mx-auto">
    <h2 class="font-bold text-xl mb-2">Track Information</h2>
    <section class="flex flex-col md:pl-4 md:flex-row justify-center md:justify-start items-center md:items-stretch">
        <figure class="mt-2 md:mr-8 grow-1 w-[192px] h-[192px]">
            <img src="https:////cdn-images.audioaddict.com/0/1/6/0/8/2/0160827a2385978a9439dec362c77e23.jpg?width=512&amp;height=512&amp;quality=mid"
                 class=""
                 alt="Cover art of In Flames - Land of Confusion">
        </figure>
        <ul id="track-info" class="mt-4 md:mt-0 grow-1 leading-6 md:leading-7">
            <li>
                <span class="label">Title</span>
                Land of Confusion
            </li>
            <li>
                <span class="label">Artist</span>
                In Flames
            </li>
            <li>
                <span class="label">Length</span>
                03:22
            </li>
            <li>
                <span class="label">First fetched</span>
                2023-04-27 01:24:47
            </li>
            <li>
                <span class="label">Play count</span>
                12
            </li>
            <li>
                <span class="label">Youtube Music</span>
                Direct | Search
            </li>
            <li>
                <span class="label">Youtube Video</span>
                Direct | Search
            </li>
        </ul>
    </section>

    <h3 class="font-bold text-lg mt-8">Recently Played</h3>
    <ul class="mt-2 md:pl-4 w-full md:w-8/12 text-sm mb-5">
        <li>
            <div class="flex flex-row justify-between">
                <time>
                    2023-04-27 01:24:47
                </time>
                <div>
                    via Thrash Metal
                </div>
            </div>
        </li>
    </ul>

    <!-- Pagination -->
    <div class="w-full text-center">
        <Pagination
                params={$storesPage.data}
                totalPages={10}
        />
    </div>
</div>

<style>
    #track-info span.label {
        display: inline-block;
        font-weight: 600;
        min-width: 8rem;
    }
</style>
