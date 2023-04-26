<script lang="ts">
    import moment from 'moment'
    import type {PlayItem} from '$lib/api'
    import {formatLength} from '$lib/api'
    import {navigateTo} from '$lib/utils'
    import ChannelText from '$lib/ChannelText.svelte'

    import youtube_music from '$lib/assets/youtube-music.svg'
    import youtube from '$lib/assets/youtube.svg'

    export let item: PlayItem
</script>

<section class="flex flex-col justify-center items-between md:flex-row md:justify-between">
    <div class="min-w-[128px] mb-3 md:my-1.5 md:mr-3 grow-0 mx-auto">
        <img src="https://{item.art_url}?width=256&height=256&quality=low"
             class="w-[128px] h-[128px]"
             alt="Cover art of {item.artist_name} - {item.title}"/>
    </div>
    <div class="grow flex flex-col">
        <div class="flex flex-row justify-between items-center mb-0">
            <a class="artist-name text-base md:text-lg leading-tight text-green-300"
               title="Song title"
               href="?track_id={item.track_id}"
               on:click={(e) => {
                   e.preventDefault()
                   navigateTo({
                        track_id: item.track_id,
                        page: 1
                   })
               }}
            >{item.title}</a>
            <div class="started text-xs text-right" title="Started">
                <time datetime="{moment.unix(item.started).format('YYYY-MM-DDTHH:mm:ssZZ')}">
                    {moment.unix(item.started).format('YYYY-MM-DD HH:mm:ss')}
                </time>
            </div>
        </div>
        <div class="flex flex-row justify-between items-end">
            <a class="track-name text-sm md:text-base leading-tight before:content-['-'] ms-1 before:me-1 text-green-300"
               title="Artist"
               href="?artist_id={item.artist_id}"
               on:click={(e) => {
                   e.preventDefault()
                   navigateTo({
                        artist_id: item.artist_id,
                        page: 1
                   })
               }}
            >{item.artist_name}</a>
            <div class="length text-xs text-right" title="Length">
                {formatLength(item.length)}
            </div>
        </div>
        <div class="text-xs mt-1 md:mt-4 text-right" title="Channel">
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
                    <a href="{item.youtube.music.direct}" class="text-sm md:text-base me-1 text-green-300">Direct</a>
                    |
                    <a href="{item.youtube.music.search}" class="text-sm md:text-base ms-1 text-green-300">Search</a>
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
                    <a href="{item.youtube.video.direct}" class="text-sm md:text-base me-1 text-green-300">Direct</a>
                    |
                    <a href="{item.youtube.video.search}" class="text-sm md:text-base ms-1 text-green-300">Search</a>
                </div>
            </div>
        </div>
    </div>
</section>
