import {goto, invalidate} from '$app/navigation'
import {PUBLIC_HOME_URL} from '$env/static/public'
import {DEFAULT_HOME_URL} from '$lib/constants'
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

export function navigateTo(path: string, invalidateTrigger = '') {
    return goto(path)
        .then(() => {
            if (invalidateTrigger.length) {
                invalidate(invalidateTrigger).then()
            }
        })
}

export function createParam(params: PageLoad): string {
    const p = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        p.set(key, value.toString())
    }

    return p.toString()
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
    const home_url = unTrailingSlashIt(PUBLIC_HOME_URL.length ? PUBLIC_HOME_URL : DEFAULT_HOME_URL)

    if (path.length && !path.startsWith('/')) {
        path = '/' + path
    }

    return home_url + (path.length ? unTrailingSlashIt(path) : '')
}
