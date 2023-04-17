<script lang="ts">
    import moment from 'moment'
    import type {PlayItem} from '$lib/api'
    import {formatLength} from '$lib/api'

    import youtube_music from '$lib/assets/youtube-music.svg'
    import youtube from '$lib/assets/youtube.svg'

    export let item: PlayItem
</script>

<section>
    <div class="flex flex-row justify-between items-end mb-2">
        <div class="artist-name text-lg leading-tight" title="Song title">
            {item.title}
        </div>
        <div class="started text-sm text-right" title="Started">
            <time datetime="{moment.unix(item.started).format('YYYY-MM-DDTHH:mm:ssZZ')}">
                {moment.unix(item.started).format('YYYY-MM-DD HH:mm:ss')}
            </time>
        </div>
    </div>
    <div class="flex flex-row justify-between items-end">
        <div class="track-name text-base leading-tight before:content-['-'] ms-1 before:me-1"
             title="Artist">
            {item.artist_name}
        </div>
        <div class="length text-sm text-right" title="Length">
            {formatLength(item.length)}
        </div>
    </div>
    <div class="flex flex-row justify-between xl:justify-start mt-4">
        <div class="mb-2">
            <img src={youtube_music}
                 type="image/svg+xml"
                 class="inline-flex me-0.5"
                 alt="Youtube music icon"
                 width="18"
                 height="18"
            />
            <div class="inline-flex">
                <a href="{item.youtube.music.direct}" class="me-1 text-green-300">Direct</a>
                |
                <a href="{item.youtube.music.search}" class="ms-1 text-green-300">Search</a>
            </div>
        </div>
        <div class="mb-2 xl:ms-6">
            <img src={youtube}
                 type="image/svg+xml"
                 class="inline-flex me-0.5"
                 alt="Youtube icon"
                 width="18"
                 height="18"
            />
            <div class="inline-flex">
                <a href="{item.youtube.video.direct}" class="me-1 text-green-300">Direct</a>
                |
                <a href="{item.youtube.video.search}" class="ms-1 text-green-300">Search</a>
            </div>
        </div>
    </div>
</section>
