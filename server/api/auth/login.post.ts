import { LoginRequest } from '~/types/request/auth.request';
import { compare } from 'bcrypt';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody<LoginRequest>(event)

    const { email, password } = body
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        })
    }

    const user = await UserSchema.findOne({ email: body.email })
    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'User not found'
        })
    }

    const verified = await compare(password, user.password)
    if (!verified) {
        throw createError({
            status: 401,
            message: 'Bad credentials'
        })
    }

    const session = serialize({ userId: user.id })
    const signedSession = sign(session, config.cookieSecret)

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(config.cookieExpires),
        expires: new Date(Date.now() + parseInt(config.cookieExpires))
    })

    return {
        user
    }
})