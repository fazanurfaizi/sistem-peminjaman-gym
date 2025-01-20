<template>
    <div class="flex justify-center items-center mx-auto max-w-sm w-full">
        <form class="mb-6 p-12 rounded border" @submit.prevent="onLogin">
            <div class="mb-3">
                <label for="email" class="mb-1 inline-block font-semibold text-sm text-black">
                    Email
                </label>
                <input 
                    id="email" 
                    v-model="form.email" 
                    type="email"
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm"
                    required
                >
            </div>
            <div class="mb-3">
                <label for="password" class="mb-1 inline-block font-semibold text-sm text-black">
                    Password
                </label>
                <input 
                    id="password" 
                    v-model="form.password" 
                    type="password"
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm"
                    required
                >
            </div>
            <div>
                <button 
                    type="submit" 
                    class="px-3 py-1.5 w-full rounded bg-light-100 font-semibold text-sm text-white bg-primary-blue hover:bg-secondary-blue focus:outline-none focus:bg-secondary-blue transition-colors"
                >
                    Lanjutkan
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch'
import type { LoginRequest } from '~/types/request/auth.request';

definePageMeta({
    middleware: ['guest'],
    layout: 'auth'
})

const toast = useToast()

const colorMode = useColorMode()
console.log(colorMode.value)
const { login } = useAuth()

const form = reactive<LoginRequest>({
    email: null,
    password: null,
})

const onLogin = async () => {
    try {
        await login(form).then(() => {
            toast.add({ title: 'Login berhasil' })
            navigateTo('/')
        })
    } catch (error) {
        if (!(error instanceof FetchError)) {
            throw error;
        }
        toast.add({ title: error.data.message })
    }
}
</script>