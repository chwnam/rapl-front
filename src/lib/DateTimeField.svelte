<script lang="ts">
import moment from "moment";

export let value: number
</script>

<time datetime="{moment.unix(value).format('YYYY-MM-DDTHH:mm:ssZZ')}">
    {moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}
</time>
