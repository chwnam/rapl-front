<script lang="ts">
    export let page: number
    export let timeSpent: number
    export let total: number
    export let totalPages: number

</script>

<div class="flex text-xs justify-between mt-2">
    <div>{page} page, total {totalPages} pages, {total} items.</div>
    <div>Query time: {timeSpent.toFixed(5)}s.</div>
</div>
