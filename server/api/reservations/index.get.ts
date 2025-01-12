import dayjs from "dayjs"
import { Reservation } from "~/types/reservation.type"

export default defineEventHandler(async (event) => {
    try {
        const { room, date, month, year, page = 1, limit = 31 } = getQuery(event)

        let filter: any = {}

        // Build filter based on query parameters
        if (month && year) {
            const startOfMonth = dayjs(`${year}-${month}-01`).format('YYYY-MM-DD')
            const endOfMonth = dayjs(startOfMonth).add(1, 'month').format('YYYY-MM-DD')
            filter.date = { $gte: startOfMonth, $lt: endOfMonth }
        } 
        
        if (date) {
            filter.date = date
        }

        if (room) {
            filter.room = room
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
        
        const reservations: Reservation[] = await ReservationSchema.find(filter).populate({
            path: 'user',
            select: 'name'
        }).skip(skip).limit(parseInt(limit as string))

        const totalCount = await ReservationSchema.countDocuments(filter)

        return {
            data: reservations,
            meta: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / parseInt(limit as string)),
                total: totalCount
            }
        }
    } catch (error) {
        return error
    }
})