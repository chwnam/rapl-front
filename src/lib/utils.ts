export function getChannelName(channelId: number|string, short = false): string {
    if ('string' === typeof channelId) {
        channelId = parseInt(channelId)
    }

    switch (channelId) {
        case 0:
            return short ? 'All' : 'All Channels'

        case 192:
            return short ? 'Thrash' : 'Thrash Metal'

        case 163:
            return short ? 'Power' : 'Power Metal'

        default:
            return ''
    }
}
