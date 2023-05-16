<script lang="ts">
    import {formatLength, homeUrl} from '$lib/utils'
    import ChannelText from '$lib/ChannelText.svelte'
    import type {PlaylistItem} from '$lib/api'

    import youtube_music from '$lib/assets/youtube-music.svg'
    import youtube from '$lib/assets/youtube.svg'
    import DateTimeField from '$lib/DateTimeField.svelte'

    export let item: PlaylistItem
</script>

<section class="flex flex-col justify-center items-between md:flex-row md:justify-between">
    <div class="min-w-full md:min-w-[128px] pt-4 pb-2 md:pb-0 mb-3 md:mb-1 md:pr-3 grow-0 text-center bg-green-950 md:bg-inherit">
        <img src="https:{item.art_url}?width=256&height=256&quality=low"
             class="inline-block w-[128px] h-[128px]"
             alt="Cover art of {item.artist_name} - {item.title}"/>
    </div>
    <div class="flex flex-col grow py-4">
        <div class="flex flex-row justify-between items-center mb-0">
            <a class="artist-name text-base md:text-lg leading-tight text-green-300"
               title="Track title"
               href={homeUrl(`/track/${item.track_id}`)}
            >{item.title}</a>
            <div class="started text-xs text-right" title="Started">
                <DateTimeField value={item.started}/>
            </div>
        </div>
        <div class="flex flex-row justify-between items-center">
            <a class="track-name text-sm md:text-base leading-tight before:content-['-'] ms-1 before:me-1 text-green-300"
               title="Artist"
               href={homeUrl(`/artist/${item.artist_id}`)}
            >{item.artist_name}</a>
            <div class="length text-xs text-right" title="Length">
                {formatLength(item.length)}
            </div>
        </div>
        <div class="text-xs mt-1 text-right" title="Channel">
            <ChannelText channelId={item.channel_id}/>
        </div>
        <div class="flex flex-row justify-between md:justify-start mt-4 grow items-end">
            <div class="mb-2">
                <img src={youtube_music}
                     type="image/svg+xml"
                     class="inline-flex me-0.5"
                     alt="Youtube music icon"
                     width="18"
                     height="18"
                />
                <div class="inline-flex">
                    <a href="{item.youtube.music.direct}"
                       class="text-sm md:text-base me-1 text-green-300">Direct</a>
                    |
                    <a href="{item.youtube.music.search}"
                       class="text-sm md:text-base ms-1 text-green-300">Search</a>
                </div>
            </div>
            <div class="mb-2 md:ms-8">
                <img src={youtube}
                     type="image/svg+xml"
                     class="inline-flex me-0.5"
                     alt="Youtube icon"
                     width="18"
                     height="18"
                />
                <div class="inline-flex">
                    <a href="{item.youtube.video.direct}"
                       class="text-sm md:text-base me-1 text-green-300">Direct</a>
                    |
                    <a href="{item.youtube.video.search}"
                       class="text-sm md:text-base ms-1 text-green-300">Search</a>
                </div>
            </div>
        </div>
    </div>
</section>
