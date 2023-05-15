import type {PageLoad} from './$types'

export const load: PageLoad = (async ({params, url}) => {
    const p = url.searchParams

    return {
        track_id: parseInt(params.track_id),
        page: parseInt(p.get('page') ?? '1'),
        per_page: parseInt(p.get('per_page') ?? '10'),
    }
}) satisfies PageLoad
