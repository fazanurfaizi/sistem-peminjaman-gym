import { ReservationRequest } from "~/types/request/reservation.request"

export default defineEventHandler(async (event) => {
    const body = await readBody<ReservationRequest>(event)

    const { date, room, startTime, endTime } = body
    if (!date || !room || !startTime || !endTime) {
        throw createError({
            statusCode: 400,
            message: 'Bad request'
        })
    }

    const user = event.context.user
    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'User not found'
        })
    }
    
    const reservations = await new ReservationSchema({
        user: user._id,
        ...body
    }).save()

    return reservations
})