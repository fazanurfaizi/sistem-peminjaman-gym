import { UserSchema } from "~/server/models/user.schema"
import { RegisterRequest } from "~/types/request/auth.request"

export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterRequest>(event)

    try {
        const user = await new UserSchema(body).save()

        return {
            user,
            message: 'Register successfully'
        }
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'user already registered.'
        })
    }    
})