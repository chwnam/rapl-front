import type {PageLoad} from './$types'

export const load: PageLoad = (async ({params, url}) => {
    const p = url.searchParams

    return {
        artist_id: parseInt(params.artist_id),
        orderby: p.get('orderby') ?? 'title:asc',
        page: parseInt(p.get('page') ?? '1'),
        per_page: parseInt(p.get('per_page') ?? '20'),
    }
}) satisfies PageLoad
