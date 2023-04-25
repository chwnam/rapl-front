<script lang="ts">
    import {getChannelName} from '$lib/utils'

    export let channelId: number
</script>

{getChannelName(channelId)}
