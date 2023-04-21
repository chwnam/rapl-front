<script lang="ts">
    import {page as storesPage} from '$app/stores'
    import type {PageData} from './$types'

    import Pagination from '$lib/Pagination.svelte'
    import PlaylistItem from '$lib/PlaylistItem.svelte'
    import QueryStat from '$lib/QueryStat.svelte'
    import Search from '$lib/Search.svelte'

    export let data: PageData

    let params = $storesPage.url.searchParams,
        page = parseInt(params.get('page') ?? '1')
</script>

<main class="min-h-screen bg-black m-5">
    <div class="container mx-auto">
        <h1 class="font-sans font-bold text-2xl xl:text-3xl text-center">
            Metal Radio Playlist
        </h1>
        <!-- Topmost tool area -->
        <div class="w-full md:w-10/12 lg:w-6/12 mt-8 mb-2 lg:mt-10 lg:mb-3 mx-auto">
            <Search bind:page/>
            <QueryStat
                    page={page}
                    total={data ? data.total : 0}
                    totalPages={data ? data.totalPages : 0}
                    timeSpent={data ? data.timeSpent : 0}
            />
        </div>
        <ul class="w-full md:w-10/12 lg:w-6/12 mb-5 mx-auto">
            {#if data}
                {#each data.items as item}
                    <li class="border border-x-0 border-t-0 border-dashed border-green-500 pt-4 pb-2.5">
                        <PlaylistItem item={item}/>
                    </li>
                {/each}
            {/if}
        </ul>
        <!-- Pagination -->
        <div class="w-full text-center">
            <Pagination
                    bind:page
                    totalPages={data? data.totalPages: 0}
            />
        </div>
    </div>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.black");
        color: theme("colors.green.500");
    }
</style>
