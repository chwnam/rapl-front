import {PUBLIC_API_URL} from '$env/static/public'

export type YoutubeLinks = {
    direct: string
    search: string
}

export type PlayItem = {
    network_id: number
    channel_id: number
    track_id: number
    title: string
    artist_id: number
    artist_name: string
    length: number
    started: number
    art_url: string
    youtube: {
        video: YoutubeLinks
        music: YoutubeLinks
    }
}

export type PlaylistQueryResult = {
    items: Array<PlayItem>
    total: number
    totalPages: number
    timeSpent: number
}

function pad(n: number): string {
    return 0 <= n && n <= 9 ? `0${n}` : n.toString()
}

export function formatLength(length: number): string {
    const minute = Math.floor(length / 60)
    const second = length % 60

    return `${pad(minute)}:${pad(second)}`
}

export function getApiUrl(): string {
    return PUBLIC_API_URL.length ? PUBLIC_API_URL : 'https://x.changwoo.pe.kr/rapl'
}

export function getEndpoint(): string {
    return getApiUrl() + '/wp-json/rapl/v1'
}

export async function queryPlaylist(args: {
    fetch?: (input: (URL | RequestInfo), init?: (RequestInit | undefined)) => Promise<Response>
    origin: string,
    params: URLSearchParams,
}): Promise<PlaylistQueryResult> {
    const {fetch, origin, params} = args

    const page = params.get('page') ?? '1',
        perPage = params.get('per_page') ?? '20',
        search = params.get('search') ?? ''

    const f = fetch ?? window.fetch
    const p = new URLSearchParams()

    p.set('page', page)
    p.set('per_page', perPage)
    p.set('search', search)

    const r = await f(`${getEndpoint()}/playlist?${p.toString()}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const items = (await r.json()) as Array<PlayItem>,
        total = r.headers.get('X-WP-Total'),
        totalPages = r.headers.get('X-WP-TotalPages'),
        timeSpent = r.headers.get('X-Rapl-TimeSpent')

    return {
        items,
        total: null !== total ? parseInt(total) : 0,
        totalPages: null !== totalPages ? parseInt(totalPages) : 0,
        timeSpent: null !== timeSpent ? parseFloat(timeSpent) : 0.0,
    }
}
