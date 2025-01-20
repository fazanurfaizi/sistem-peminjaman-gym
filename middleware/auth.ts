export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn } = useAuth()

    if (!loggedIn.value) return navigateTo({ name: 'login' })

    watch(loggedIn, () => {
    })
})