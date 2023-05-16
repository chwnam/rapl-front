<script lang="ts">
    import {DEFAULT_BLOG_URL, DEFAULT_MCPL_URL, DEFAULT_TITLE} from '$lib/constants'
</script>

<footer class="container mx-auto mt-5">
    <div class="w-full md:w-10/12 lg:w-6/12 bg-green-900 px-2 pt-2 pb-4 mx-auto">
        <p class="text-sm">
            {DEFAULT_TITLE}, by
            <a href={DEFAULT_BLOG_URL}
               class="text-green-300"
               target="_blank">changwoo</a>
        </p>
        <p class="text-xs text-right">
            <a href={DEFAULT_MCPL_URL}
               class="text-green-300"
               target="_blank">Music Camp Playlist</a>
        </p>
    </div>
</footer>
