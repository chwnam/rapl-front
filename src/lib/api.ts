import {PUBLIC_API_URL} from '$env/static/public'
import {DEFAULT_API_URL} from '$lib/constants'

export type PlaybackCount = {
    playback_count: number
}

export type PerformanceParams = {
    timeSpent: number
}

export type PaginationParams = {
    total: number
    totalPages: number
}

export type QueryResult<T> = PerformanceParams & PaginationParams & {
    items: Array<T>
}

export type Artist = {
    artist_id: number
    artist_name: string
}

export type Track = {
    track_id: number
    title: string
    length: number
    art_url: string
    track_count: number
}

export type History = {
    network_id: number
    channel_id: number
    track_id: number
    history_id: number
    started: number
}

export type YoutubeLinks = {
    video: {
        direct: string
        search: string
    }
    music: {
        direct: string
        search: string
    }
}

export type MediaLinks = {
    youtube: YoutubeLinks
}

export type PlaylistItem = Artist & Track & History & MediaLinks

export type ArtistInfo = {
    artist: Artist,
    total_tracks: number,
    total_playback: number,
    first_fetched: number,
    last_fetched: number,
    tracks: Array<Track & PlaybackCount & MediaLinks>,
} & PerformanceParams & PaginationParams

export type TrackInfo = {
    track: Artist & Track,
    first_fetched: number,
    last_fetched: number,
    history: Array<Omit<History, 'track_id'>>,
} & MediaLinks & PerformanceParams & PaginationParams

export type QueryParams = { [key: string]: string | number }

export type Criteria = 'artist' | 'track' | 'shuffle'
export type Duration = string
export type Exclude = 'yes' | 'no'
export type Order = 'asc' | 'desc'

export function getApiUrl(): string {
    return PUBLIC_API_URL.length ? PUBLIC_API_URL : DEFAULT_API_URL
}

export function getBaseEndpoint(): string {
    return getApiUrl() + '/wp-json/rapl/v1'
}

export async function queryPlaylist(
    params: QueryParams,
    origin: string,
): Promise<QueryResult<PlaylistItem>> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getBaseEndpoint()}/playlist?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const items = (await r.json()) as Array<PlaylistItem>,
        total = r.headers.get('X-RAPL-Total'),
        totalPages = r.headers.get('X-RAPL-TotalPages'),
        timeSpent = r.headers.get('X-RAPL-TimeSpent')

    return {
        items,
        total: null !== total ? parseInt(total) : 0,
        totalPages: null !== totalPages ? parseInt(totalPages) : 0,
        timeSpent: null !== timeSpent ? parseFloat(timeSpent) : 0.0,
    }
}

export async function queryTrackInfo(
    trackId: number,
    params: QueryParams,
    origin: string
): Promise<TrackInfo> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getBaseEndpoint()}/track/${trackId}?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const items = await r.json(),
        total = r.headers.get('X-RAPL-Total'),
        totalPages = r.headers.get('X-RAPL-TotalPages'),
        timeSpent = r.headers.get('X-Rapl-TimeSpent')

    return {
        ...items,
        total,
        totalPages,
        timeSpent,
    }
}

export async function queryArtistInfo(
    artistId: number,
    params: QueryParams,
    origin: string,
): Promise<ArtistInfo> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getBaseEndpoint()}/artist/${artistId}?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const data = await r.json(),
        total = r.headers.get('X-RAPL-Total'),
        totalPages = r.headers.get('X-RAPL-TotalPages'),
        timeSpent = r.headers.get('X-Rapl-TimeSpent')

    return {
        ...data,
        total: null !== total ? parseInt(total) : 0,
        totalPages: null !== totalPages ? parseInt(totalPages) : 0,
        timeSpent: null !== timeSpent ? parseFloat(timeSpent) : 0.0,
    }
}

export async function queryRanking(
    criteria: Criteria,
    duration: Duration,
    exclude: Exclude,
    number: number,
    order: Order,
) {
    const urlParams = buildParams({criteria, duration, exclude, number, order})

    const r = await fetch(`${getBaseEndpoint()}/ranking?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    return await r.json()
}

function buildParams(params: { [key: string]: string | number }): string {
    const p = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        p.set(key, value.toString())
    }

    return p.toString()
}
