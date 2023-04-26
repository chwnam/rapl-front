<script lang="ts">
    import {navigateTo} from '$lib/utils'
    import type {PageLoad} from '../routes/$types'

    export let params: PageLoad
    export let totalPages: number

    let inputValue = params.page
</script>

<p class="flex flex-row items-center justify-center">
    <a href={'#'}
       class="pr-4 text-2xl md:text-xl text-green-300"
       title="To the first page."
       on:click={(e) => {
           e.preventDefault()
           navigateTo({
                ...params,
                page:1,
           })
       }}>&laquo;</a>

    <a href={'#'}
       class="pr-4 text-2xl md:text-xl text-green-300"
       title="To the previous page."
       on:click={(e) => {
           e.preventDefault()
           navigateTo({
            ...params,
            page: Math.max(1, params.page-1)
           })
       }}>&lsaquo;</a>

    <label for="page" class="sr-only">Page number</label>
    <input id="page"
           class="bg-black text-lg md:text-base w-10 no-spinner border border-dashed border-green-500 text-right px-2 me-1 focus:outline-none"
           type="number"
           bind:value={inputValue}
           on:change={() => {
                navigateTo({
                    ...params,
                    page: inputValue
                })
           }}
    > <span class="text-lg md:text-base">/ {totalPages}</span>

    <a href={'#'}
       class="pl-4 text-2xl md:text-xl text-green-300"
       title="To the next page."
       on:click={(e) => {
           e.preventDefault()
           navigateTo({
                ...params,
                page: Math.min(totalPages, inputValue+1)
           })
       }}>&rsaquo;</a>

    <a href={'#'}
       class="pl-4 text-2xl md:text-xl text-green-300"
       title="To the last page."
       on:click={(e) => {
           e.preventDefault()
           navigateTo({
                ...params,
                page: totalPages
           })
       }}>&raquo;</a>
</p>
