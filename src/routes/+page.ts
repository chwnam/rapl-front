import type {PageLoad} from './$types'

import {queryPlaylist} from '$lib/api'

export const ssr = false;

export const load = (({fetch, url}) => {
    const {origin, searchParams: params} = url

    return queryPlaylist({fetch, origin, params})
}) satisfies PageLoad
