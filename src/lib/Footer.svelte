<script lang="ts">
    import { DEFAULT_1D1M_URL, DEFAULT_BLOG_URL, DEFAULT_MCPL_URL, DEFAULT_TITLE } from "$lib/constants"
    import {homeUrl} from '$lib/utils'
</script>

<footer class="container mx-auto mt-5">
    <div class="w-full md:w-10/12 lg:w-6/12 bg-green-950 px-2 pt-2 pb-4 mx-auto">
        <p class="text-sm">
            {DEFAULT_TITLE}, by
            <a href={DEFAULT_BLOG_URL}
               class="text-green-300"
               target="_blank">changwoo</a>
        </p>
        <ul class="text-xs text-right leading-5">
            <li>
                <a href={homeUrl('/ranking')}
                   class="text-green-300">Ranking</a>
            </li>
            <li>
                <a href={DEFAULT_MCPL_URL}
                   class="text-green-300"
                   target="_blank">Music Camp Playlist</a>
            </li>
            <li>
                <a href="{DEFAULT_1D1M_URL}"
                   class="text-green-300"
                   target="_blank">1D1M Check</a>
            </li>
        </ul>
    </div>
</footer>
