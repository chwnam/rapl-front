<script lang="ts">
    export let page: number

    export let totalPages: number

    export let onClickPage: (page: number) => void

</script>

<p class="flex flex-row items-center justify-center">
    <a href={'#'}
       class="px-2 mr-4 text-3xl md:text-2xl text-green-300"
       title="To the first page."
       on:click={(e) => {
           e.preventDefault()
           onClickPage(1)
       }}
    >&laquo;</a>

    <a href={'#'}
       class="px-2 mr-4 text-3xl md:text-2xl text-green-300"
       title="To the previous page."
       on:click={(e) => {
           e.preventDefault()
           onClickPage(Math.max(1, page-1))
       }}
    >&lsaquo;</a>

    <label for="page" class="sr-only">Page number</label>
    <input id="page"
           class="bg-black text-xl md:text-base w-10 no-spinner border border-dashed border-green-500 text-green-300 text-center px-2 me-1 focus:outline-none"
           type="number"
           bind:value={page}
           on:click={(e) => {
               e.target.select()
           }}
           on:change={() => {
               onClickPage(page)
           }}
    > <span class="text-lg md:text-base">/ {totalPages}</span>

    <a href={'#'}
       class="px-2 ml-4 text-3xl md:text-2xl text-green-300"
       title="To the next page."
       on:click={(e) => {
           e.preventDefault()
           onClickPage(Math.min(totalPages, page+1))
       }}
    >&rsaquo;</a>

    <a href={'#'}
       class="px-2 ml-4 text-3xl md:text-2xl text-green-300"
       title="To the last page."
       on:click={(e) => {
           e.preventDefault()
           onClickPage(totalPages)
       }}
    >&raquo;</a>
</p>
