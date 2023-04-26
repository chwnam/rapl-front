import type {PageLoad} from './$types'

export const load: PageLoad = (async ({url, depends}) => {
    const p = url.searchParams

    depends('app:page')

    return {
        artist_id: parseInt(p.get('artist_id') ?? '0'),
        channel_id: parseInt(p.get('channel_id') ?? '0'),
        page: parseInt(p.get('page') ?? '1'),
        per_page: parseInt(p.get('per_page') ?? '20'),
        search: p.get('search') ?? '',
        track_id: parseInt(p.get('track_id') ?? '0')
    }
}) satisfies PageLoad
