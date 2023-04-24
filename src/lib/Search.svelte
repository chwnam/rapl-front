<script lang="ts">
    import {goto, invalidateAll} from '$app/navigation'
    import {page as storesPage} from '$app/stores'

    export let page: number
    let search = $storesPage.url.searchParams.get('search') ?? ''

    function invalidateQuery(query: string) {
        const newParams = new URLSearchParams($storesPage.url.searchParams.toString())
        newParams.set('artist_id', '0')
        newParams.set('channel_id', '0')
        newParams.set('page', '1')
        newParams.set('search', query)
        newParams.set('track_id', '0')
        page = 1
        goto(`?${newParams.toString()}`).then(() => {
            invalidateAll()
        })
    }
</script>


<div class="flex">
    <label for="search" class="sr-only">Search</label>
    <input id="search"
           name="search"
           type="search"
           class="box-content grow shrink min-w-0 bg-black border-4 border-solid border-green-500 p-3 placeholder:text-green-500 placeholder:italic focus:outline-none"
           bind:value={search}
           on:keyup={(e) => {
               if ('Enter' === e.key) {
                   invalidateQuery(search)
               }
           }}
           placeholder="Search song title, or artist name ..."
    />
    <button
            class="box-content grow-0 shrink-0 text-black bg-green-500 p-3 border-4 border-solid border-green-500"
            type="submit"
            on:click={() => {
                invalidateQuery(search)
            }}
    >
        Search
    </button>
</div>
