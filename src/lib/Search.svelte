<script lang="ts">
    import {page} from '$app/stores'
    import {navigateTo} from '$lib/utils'
</script>


<div class="flex">
    <label for="search" class="sr-only">Search</label>
    <input id="search"
           name="search"
           type="search"
           class="box-content grow shrink min-w-0 bg-black border-4 border-solid border-green-500 p-3 placeholder:text-green-500 placeholder:italic focus:outline-none"
           value={$page.data.search}
           on:keyup={(e) => {
               if ('Enter' === e.key) {
                   navigateTo({search:e.target.value})
               }
           }}
           placeholder="Search song title, or artist name ..."
    />
    <button
            class="box-content grow-0 shrink-0 text-black bg-green-500 p-3 border-4 border-solid border-green-500"
            type="submit"
            on:click={() => {
                navigateTo({search:document.getElementById('search').value})
            }}
    >
        Search
    </button>
</div>
