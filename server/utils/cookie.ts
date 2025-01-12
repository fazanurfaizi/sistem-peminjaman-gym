import type { KeyObject } from 'node:crypto'
import { createHmac, timingSafeEqual } from 'node:crypto'

export type CookieSecret = string|Buffer|KeyObject

export const serialize = (obj: object) => {
    const value = Buffer.from(JSON.stringify(obj), 'utf-8').toString('base64')

    if (Buffer.byteLength(value) > 4096) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Cookie top large'
        })
    }

    return value
}

export const deserialize = (value: string) => {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'))
}

export const sign = (value: string, secret: CookieSecret) => {
    const signature = createHmac('sha256', secret).update(value).digest('base64').replace(/=+$/, '')

    return `${value}.${signature}`
}

export const unsign = (input: string, secret: CookieSecret) => {
    const value = input.slice(0, input.lastIndexOf('.'))
    const expectedInput = sign(value, secret)
    const inputBuffer = Buffer.from(input)
    const expectedBuffer = Buffer.from(expectedInput)

    if (!(expectedBuffer.equals(inputBuffer) && timingSafeEqual(expectedBuffer, inputBuffer))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid cookie signature',
            message: 'Invalid cookie signature'
        })
    }

    return value
}