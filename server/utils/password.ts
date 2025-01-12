import { hash, verify } from '@node-rs/argon2'

export const hashPassword = async (plainPassword: string) => {
    return await hash(plainPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    })
}

export const verifyPassword = async (hash: string, plainPassword: string) => {
    return await verify(hash, plainPassword)
}