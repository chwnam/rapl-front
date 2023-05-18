<script lang="ts">
    import {DEFAULT_TITLE} from '$lib/constants'
    import {homeUrl} from '$lib/utils'
</script>
<header class="container mx-auto mt-5">
    <h1 class="font-bold text-4xl md:text-3xl text-center">
        <a href={homeUrl()}>{DEFAULT_TITLE}</a>
    </h1>
</header>
