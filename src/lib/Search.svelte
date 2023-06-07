<script lang="ts">
    import {page} from '$app/stores'
    import {createParam, navigateTo} from '$lib/utils'

    let search = $page.data.search
</script>

<div class="flex">
    <label for="search" class="sr-only">Search</label>
    <input id="search"
           name="search"
           type="search"
           class="box-content grow shrink min-w-0 bg-black border-4 border-solid border-green-300 p-3 placeholder:text-green-500 placeholder:italic focus:outline-none"
           bind:value={search}
           on:keyup={(e) => {
               if ('Enter' === e.key) {
                   navigateTo(`?${createParam({search:e.target.value})}`)
               }
           }}
           placeholder="Search song title, or artist name ..."
    />
    <button
            class="box-content grow-0 shrink-0 text-black bg-green-300 p-3 border-4 border-solid border-green-300"
            type="submit"
            on:click={() => {
                navigateTo(`?${createParam({search})}`)
            }}
    >
        Search
    </button>
</div>
