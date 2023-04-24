<script lang="ts">
    import {page as storesPage} from '$app/stores'
    import {goto} from '$app/navigation'

    export let page: number

    $: params = $storesPage.url.searchParams
    $: channelId = params.get('channel_id') ?? '0'

    function invalidateQuery(params: string) {
        page = 1
        goto(`?${(new URLSearchParams(params)).toString()}`)
    }
</script>

<div class="mt-5 mb-0">
    {#if '0' === channelId}
        <span class="text-xs bg-green-700 text-black px-2 py-1 me-1">All Channels</span>
    {:else}
        <span class="text-xs bg-green-300 text-black px-2 py-1 me-1 cursor-pointer"><a href="?channel_id=0" on:click={(e) => {
            e.preventDefault()
            invalidateQuery(e.target.getAttribute('href'))
        }}>All Channels</a></span>
    {/if}

    {#if '192' === channelId}
        <span class="text-xs bg-green-700 text-black px-2 py-1 mx-1">Thrash Metal</span>
    {:else}
        <span class="text-xs bg-green-300 text-black px-2 py-1 me-1 cursor-pointer"><a href="?channel_id=192" on:click={(e) => {
            e.preventDefault()
            invalidateQuery(e.target.getAttribute('href'))
        }}>Trash Metal</a></span>
    {/if}

    {#if '163' === channelId}
        <span class="text-xs bg-green-700 text-black px-2 py-1 mx-1">Power Meta</span>
    {:else}
        <span class="text-xs bg-green-300 text-black px-2 py-1 me-1 cursor-pointer"><a href="?channel_id=163" on:click={(e) => {
            e.preventDefault()
            invalidateQuery(e.target.getAttribute('href'))
        }}>Power Metal</a></span>
    {/if}
</div>
