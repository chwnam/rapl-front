import {goto, invalidate} from '$app/navigation'
import {PUBLIC_HOME_URL} from '$env/static/public'
import type {PageLoad} from '../routes/$types'

export function pad(n: number): string {
    return 0 <= n && n <= 9 ? `0${n}` : n.toString()
}

export function formatLength(length: number): string {
    const minute = Math.floor(length / 60)
    const second = length % 60

    return `${pad(minute)}:${pad(second)}`
}

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

    return goto(homeUrl(`?${p.toString()}`)).then(() => invalidate('app:page'))
}

export function unTrailingSlashIt(str: string): string {
    if (str.endsWith('/') || str.endsWith('\\')) {
        return unTrailingSlashIt(str.slice(0, -1))
    }

    return str
}

export function trailingSlashIt(str: string): string {
    return unTrailingSlashIt(str) + '/'
}

export function homeUrl(path = ''): string {
    return PUBLIC_HOME_URL + (path.length ? unTrailingSlashIt(path) : '')
}
