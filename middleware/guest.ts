export default defineNuxtRouteMiddleware(async () => {
    const { user } = useAuth()

    if (user.value) {
        if (import.meta.server) return navigateTo({ name: 'home' })

        return abortNavigation()
    }
})