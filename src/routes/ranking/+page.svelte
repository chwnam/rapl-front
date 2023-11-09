<script lang="ts">
import {DEFAULT_TITLE} from '$lib/constants'
import {queryRanking} from '$lib/api'

const r = queryRanking('artist', '1w', 'yes', 10, 'desc')

r.then((response) => {
    console.log(response)
})
</script>

<svelte:head>
    <title>{DEFAULT_TITLE} Ranking</title>
</svelte:head>

<section>
    Ranking
</section>
