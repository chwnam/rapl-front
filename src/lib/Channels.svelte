<script lang="ts">
    import {page as storesPage} from '$app/stores'
    import {goto} from '$app/navigation'
    import {getChannelName} from '$lib/utils'

    export let page: number

    $: params = $storesPage.url.searchParams
    $: channelId = params.get('channel_id') ?? '0'

    function invalidateQuery(params: string) {
        page = 1
        goto(`?${(new URLSearchParams(params)).toString()}`)
    }

    const channelIds = ['0', '192', '163']
</script>

<div class="mt-5 mb-0">
    {#each channelIds as c}
        {#if c === channelId}
            <span class="text-xs bg-green-700 text-black px-2 py-1 me-1">{getChannelName(c)}</span>
        {:else}
            <span class="text-xs bg-green-300 text-black px-2 py-1 me-1 cursor-pointer"><a href={`?channel_id=${c}`} on:click={(e) => {
            e.preventDefault()
            invalidateQuery(e.target.getAttribute('href'))
        }}>{getChannelName(c)}</a></span>
        {/if}
    {/each}
</div>
