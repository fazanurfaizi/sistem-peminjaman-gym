import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import { Reservation } from '~/types/reservation.type'

export const ReservationSchema = defineMongooseModel<Reservation>({
    name: 'Reservation',
    schema: {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        },
        date: {
            type: 'string',
            required: true
        },
        room: {
            type: 'string',
            required: true
        },
        telephone: {
            type: 'string',
            required: true
        },
        startTime: {
            type: 'string',
            required: true
        },
        endTime: {
            type: 'string',
            required: true
        },
    },
    options: {
        timestamps: true
    }
})