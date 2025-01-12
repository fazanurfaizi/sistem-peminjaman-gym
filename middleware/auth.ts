export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn, me } = useAuth()

    watch(loggedIn, () => {
        if (!loggedIn.value) return navigateTo({ name: 'login' })
    })
})