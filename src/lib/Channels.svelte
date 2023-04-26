<script lang="ts">
    import type {PageLoad} from '../routes/$types'
    import {getChannelName, navigateTo} from '$lib/utils'

    const channelIds = [0, 192, 163, 149]

    export let params: PageLoad
</script>

<div class="mt-5 mb-0">
    {#each channelIds as channelId}
        {#if channelId === params.channel_id}
            <span class="text-xs bg-green-700 text-black px-2 py-1 me-1">{getChannelName(channelId)}</span>
        {:else}
            <span class="text-xs bg-green-300 text-black px-2 py-1 me-1 cursor-pointer">
                <a href={`?channel_id=${channelId}`} on:click={(e) => {
                    e.preventDefault()
                    navigateTo({
                        channel_id: channelId,
                        page: 1,
                        search: params.search,
                    })
                }}>{getChannelName(channelId)}</a></span>
        {/if}
    {/each}
</div>
