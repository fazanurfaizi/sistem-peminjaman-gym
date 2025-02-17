import { User } from "~/types/user.type"
import { getUserFromSession } from "../utils/session"

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)
    if (user) event.context.user = user
})

declare module 'h3' {
    interface H3EventContext {
        user?: User
    }
}