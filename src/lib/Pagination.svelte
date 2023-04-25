<script lang="ts">
    import {goto} from '$app/navigation'
    import {page as storesPage} from '$app/stores'

    export let page: number
    export let totalPages: number

    function invalidateQuery(newPage: number) {
        if (!isNaN(newPage) && newPage != page) {
            const newParams = new URLSearchParams($storesPage.url.searchParams.toString())
            newParams.set('page', newPage.toString())
            page = newPage
            goto(`?${newParams.toString()}`)
        }
    }
</script>

<p class="flex flex-row items-center justify-center">
    <a href={'#'}
       class="pr-4 text-2xl md:text-xl text-green-300"
       title="To the first page."
       on:click={(e) => {
           e.preventDefault()
           invalidateQuery(1)
       }}>&laquo;</a>

    <a href={'#'}
       class="pr-4 text-2xl md:text-xl text-green-300"
       title="To the previous page."
       on:click={(e) => {
           e.preventDefault()
           invalidateQuery(Math.max(1, page-1))
       }}>&lsaquo;</a>

    <label for="page" class="sr-only">Page number</label>
    <input id="page"
           class="bg-black text-lg md:text-base w-10 no-spinner border border-dashed border-green-500 text-right px-2 me-1 focus:outline-none"
           type="number"
           bind:value={page}
           on:change={(e) => {
               invalidateQuery(parseInt(e.target.value))
           }}
    > <span class="text-lg md:text-base">/ {totalPages}</span>

    <a href={'#'}
       class="pl-4 text-2xl md:text-xl text-green-300"
       title="To the next page."
       on:click={(e) => {
           e.preventDefault()
           invalidateQuery(Math.min(totalPages, page+1))
       }}>&rsaquo;</a>

    <a href={'#'}
       class="pl-4 text-2xl md:text-xl text-green-300"
       title="To the last page."
       on:click={(e) => {
           e.preventDefault()
           invalidateQuery(totalPages)
       }}>&raquo;</a>
</p>
