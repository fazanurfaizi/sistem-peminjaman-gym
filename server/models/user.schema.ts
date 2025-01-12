import { defineMongooseModel } from '#nuxt/mongoose'
import { hash, genSalt } from 'bcrypt'
import { User } from '~/types/user.type'

export const UserSchema = defineMongooseModel<User>({
    name: 'User',
    schema: {
        name: {
            type: 'string',
            required: true,
        },
        npm: {
            type: 'string',
            required: true,
            unique: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    options: {
        timestamps: true,    
    },
    hooks(schema) {
        schema.pre('save', async function(this, next) {
            try {
                // Only hash the password if it has been modified (or is new)
                if (!this.isModified('password')) return next()

                const salt = await genSalt(10)

                this.password = await hash(this.password, salt)

                next()
            } catch (error: Error|any) {
                next(error)
            }
        })
    }
})