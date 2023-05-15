import {PUBLIC_API_URL, PUBLIC_DEFAULT_API_URL} from '$env/static/public'

export type QueryResult<T> = {
    items: Array<T>
    total: number
    totalPages: number
    timeSpent: number
}

export type Artist = {
    artist_id: number
    artist_name: number
}

export type Track = {
    track_id: number
    title: string
    length: number
    art_url: string
}

export type History = {
    history_id: number
    network_id: number
    channel_id: number
    track_id: number
    started: number
}

export type PlaybackCount = Track & {
    playback_count: number
}

export type YoutubeLinks = {
    direct: string
    search: string
}

export type PlaylistItem = Artist & Track & History & {
    youtube: {
        video: YoutubeLinks
        music: YoutubeLinks
    }
}

export type ArtistInfo = {
    artist_info: Artist,
    total_tracks: number,
    first_fetched: string,
    last_fetched: string,
    tracks: Array<PlaybackCount>,
}

export type TrackInfo = {
    track_info: Artist & Track,
    first_fetched: string,
    last_fetched: string,
    history: Array<PlaybackCount>,
}

export type QueryParams = { [key: string]: string | number }

export function getApiUrl(): string {
    return PUBLIC_API_URL.length ? PUBLIC_API_URL : PUBLIC_DEFAULT_API_URL
}

export function getEndpoint(): string {
    return getApiUrl() + '/wp-json/rapl/v1'
}

export async function queryPlaylist(
    params: QueryParams,
    origin: string,
): Promise<QueryResult<PlaylistItem>> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getEndpoint()}/playlist?${urlParams}`, {
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
): Promise<QueryResult<TrackInfo>> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getEndpoint()}/track/${trackId}?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const items = (await r.json()) as Array<TrackInfo>,
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

export async function queryArtistInfo(
    artistId: number,
    params: QueryParams,
    origin: string,
): Promise<QueryResult<ArtistInfo>> {
    const urlParams = buildParams(params)

    const r = await fetch(`${getEndpoint()}/artist/${artistId}?${urlParams}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': origin,
        },
    })

    const items = (await r.json()) as Array<ArtistInfo>,
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

function buildParams(params: { [key: string]: string | number }): string {
    const p = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
        p.set(key, value.toString())
    }

    return p.toString()
}
