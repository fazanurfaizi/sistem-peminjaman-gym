import type { H3Event } from 'h3'
import { deserialize, unsign } from './cookie'

export const getUserFromSession = async (event: H3Event) => {
    const config = useRuntimeConfig(event)

    const cookie = getCookie(event, config.cookieName)
    if (!cookie) return null

    const unsignedSession = unsign(cookie, config.cookieSecret)
    if (!unsignedSession) return null

    const session = deserialize(unsignedSession)

    const user = await UserSchema.findById(session.userId).select('-password')

    return user
}