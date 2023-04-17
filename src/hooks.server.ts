import type {Handle} from '@sveltejs/kit'

export const handle = (({event, resolve}) => {
    return resolve(event, {
        filterSerializedResponseHeaders: (name) => name.startsWith('x-'),
    })
}) satisfies Handle
