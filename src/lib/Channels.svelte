<script lang="ts">
    import type {PageLoad} from '../routes/$types'
    import {createParam, getChannelName} from '$lib/utils'

    const channelIds = [0, 192, 163, 149]

    export let params: PageLoad
</script>

<div class="mt-5 mb-5 md:mb-1 grid grid-cols-4 md:flex">
    {#each channelIds as channelId}
        {#if channelId === params.channel_id}
            <div class="inline-block text-xs bg-green-700 text-black px-2 py-1 m-0.5">
                <span class="block md:hidden text-center">{getChannelName(channelId, true)}</span>
                <span class="hidden md:block">{getChannelName(channelId, false)}</span>
            </div>
        {:else}
            <div class="inline-block text-xs bg-green-300 text-black px-2 py-1 m-0.5 cursor-pointer">
                <a href={`?${createParam({channel_id: channelId, page: 1, search: params.search})}`}
                   class="tracking-tight md:tracking-normal"
                >
                    <span class="block md:hidden text-center">{getChannelName(channelId, true)}</span>
                    <span class="hidden md:block">{getChannelName(channelId, false)}</span>
                </a>
            </div>
        {/if}
    {/each}
</div>
