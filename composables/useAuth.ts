import type { LoginRequest, RegisterRequest } from "~/types/request/auth.request"
import type { User } from "~/types/user.type"

const useUserSessionState = () => useState<User|null>('user', () => null)

export const useAuth = () => {
    const config = useRuntimeConfig()
    const cookie = useCookie(config.cookieName)

    const sessionUser = useUserSessionState()

    const setUser = (user: User|null) => sessionUser.value = user

    const register = async (request: RegisterRequest) => {
        const data: any = await $fetch('/api/auth/register', {
            method: 'POST',
            body: request
        })

        return data
    }

    const login = async (request: LoginRequest) => {
        const data: any = await $fetch('/api/auth/login', {
            method: 'POST',
            body: request
        })

        setUser(data.user)

        return data
    }

    const logout = async () => {
        const data = await $fetch('/api/auth/logout', { method: 'POST' })

        setUser(null)
    }

    const me = async () => {
        if (!sessionUser.value) {
            try {
                const data: any = await $fetch('/api/auth/me', {
                    headers: useRequestHeaders(['cookie']) as HeadersInit
                })

                setUser(data.user)
            } catch {
                setUser(null)
            }
        }

        return sessionUser
    }

    return {
        user: computed(() => sessionUser.value || null),
        loggedIn: computed(() => Boolean(cookie.value)),
        register,
        login,
        logout,
        me
    }
}