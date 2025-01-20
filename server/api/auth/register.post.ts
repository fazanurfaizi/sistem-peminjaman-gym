import { UserSchema } from "~/server/models/user.schema"
import { RegisterRequest } from "~/types/request/auth.request"

export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterRequest>(event)

    try {
        const { name, npm, email, password } = body
        if (!email || !password || !name || !npm) {
            throw createError({
                statusCode: 400,
                message: 'Bad request'
            })
        }

        const checkEmail = await UserSchema.findOne({ 
            $or: [
                { email: email },
                { npm: npm }
            ]
        })
        if (checkEmail) {
            throw createError({
                statusCode: 401,
                message: 'Pengguna sudah terdaftar'
            })
        }

        const user = await new UserSchema(body).save()

        return {
            user,
            message: 'Register berhasil'
        }
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'user already registered.'
        })
    }    
})