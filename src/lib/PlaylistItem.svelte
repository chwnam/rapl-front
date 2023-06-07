<script lang="ts">
    import type {PlaylistItem} from '$lib/api'
    import {formatLength, homeUrl} from '$lib/utils'
    import ChannelText from '$lib/ChannelText.svelte'
    import DateTimeField from '$lib/DateTimeField.svelte'
    import YoutubeLinks from '$lib/YoutubeLinks.svelte'

    export let item: PlaylistItem
</script>

<section class="flex flex-col items-between md:flex-row md:justify-between">
    <div class="min-w-full md:min-w-[128px] py-4 md:pb-0 mb-3 md:mb-0 md:pr-3 grow-0 text-center bg-green-950 md:bg-inherit">
        <img src="https:{item.art_url}?width=256&height=256&quality=low"
             class="inline-block w-[128px] h-[128px]"
             alt="Cover art of {item.artist_name} - {item.title}"/>
    </div>
    <div class="flex flex-col grow">
        <div class="flex justify-between md:pt-3">
            <ul class="grow">
                <li>
                    <a class="artist-name text-base md:text-lg leading-tight text-green-300"
                       title="Track title"
                       href={homeUrl(`/track/${item.track_id}`)}
                    >{item.title}</a>
                </li>
                <li>
                    <a class="track-name text-sm md:text-base leading-tight before:content-['-'] ms-1 before:me-1 text-green-300"
                       title="Artist"
                       href={homeUrl(`/artist/${item.artist_id}`)}
                    >{item.artist_name}</a>
                </li>
            </ul>
            <ul class="text-xs">
                <li class="channel">
                    <a class="channel text-green-300" title="Channel"
                       href={homeUrl(`?channel_id=${item.channel_id}`)}
                    >
                        <ChannelText channelId={item.channel_id}/>
                    </a>
                </li>
                <li class="length">
                    {formatLength(item.length)}
                </li>
                <li class="started">
                    <DateTimeField value={item.started}/>
                </li>
                <li class="track_count">
                    Count: {item.track_count}
                </li>
            </ul>
        </div>
        <div class="flex flex-row justify-between md:justify-end grow items-end mt-3 md:mt-0">
            <YoutubeLinks item={item.youtube}/>
        </div>
    </div>
</section>
