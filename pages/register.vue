<template>
    <div class="flex justify-center items-center mx-auto max-w-sm w-full">
        <form class="mb-6 p-12 rounded shadow" @submit.prevent="onRegister">
            <div class="mb-3">
                <label for="name" class="mb-1 inline-block font-semibold text-sm text-black">
                    Nama
                </label>
                <input 
                    id="name" 
                    v-model="form.name" 
                    type="text"
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    required
                >
            </div>
            <div class="mb-3">
                <label for="npm" class="mb-1 inline-block font-semibold text-sm text-black">
                    NPM
                </label>
                <input 
                    id="npm" 
                    v-model="form.npm" 
                    type="text"
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    required
                >
            </div>
            <div class="mb-3">
                <label for="email" class="mb-1 inline-block font-semibold text-sm text-black">
                    Email
                </label>
                <input 
                    id="email" 
                    v-model="form.email" 
                    type="email"
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
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
                    class="px-3 py-1.5 w-full border rounded border-primary-grey bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
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
import type { RegisterRequest } from '~/types/request/auth.request';

definePageMeta({
    middleware: ['guest'],
    layout: 'auth'
})

const { register } = useAuth()

const form = reactive<RegisterRequest>({
    name: null,
    npm: null,
    email: null,
    password: null,
})

const onRegister = async () => {
    try {
        await register(form)

        await navigateTo('/home')
    } catch (error) {
        if (!(error instanceof FetchError)) {
            throw error;
        }    
    }
}
</script>