export default defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) {
        return {
            user: null
        }
    }
    
    return {
        user: user
    }
})