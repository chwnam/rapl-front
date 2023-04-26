import {goto, invalidate} from '$app/navigation'
import type {PageLoad} from '../routes/$types'

export function getChannelName(channelId: number | string, short = false): string {
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

        case 149:
            return short ? 'Heavy' : 'Heavy Metal'

        default:
            return ''
    }
}

export function navigateTo(params: PageLoad) {
    const p = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        p.set(key, value.toString())
    }

    return goto(`?${p.toString()}`).then(() => invalidate('app:page'))
}
