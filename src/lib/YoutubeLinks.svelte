<script lang="ts">
import youtube from '$lib/assets/youtube.svg'
import youtube_music from "$lib/assets/youtube-music.svg";
import type {YoutubeLinks} from '$lib/api'

export let item: YoutubeLinks
</script>

<div>
    <img src={youtube_music}
         type="image/svg+xml"
         class="inline-flex me-0.5"
         alt="YT Music ico"
         width="18"
         height="18"
    />
    <div class="inline-flex">
        <a href={item.music.search} class="text-sm md:text-base me-1 text-green-300">Search</a>
        |
        <a href={item.music.direct} class="text-sm md:text-base ms-1 text-green-300">Direct</a>
    </div>
</div>
<div class="md:ms-8">
    <img src={youtube}
         type="image/svg+xml"
         class="inline-flex me-0.5"
         alt="YouTube icon"
         width="18"
         height="18"
    />
    <div class="inline-flex">
        <a href={item.video.search} class="text-sm md:text-base me-1 text-green-300">Search</a>
        |
        <a href={item.video.direct} class="text-sm md:text-base ms-1 text-green-300">Direct</a>
    </div>
</div>
