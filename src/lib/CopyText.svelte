<script lang="ts">
    export let text = ''

    let label = 'Copy'

    function copyToClipboard() {
        if (text) {
            navigator.clipboard.writeText(text)
            label = 'Copied!'
            setTimeout(() => label = 'Copy', 10000)
        }
    }
</script>

<a class="text-green-300" href={'#'} data-text={text} on:click={() => copyToClipboard()}>
    {label}
</a>
