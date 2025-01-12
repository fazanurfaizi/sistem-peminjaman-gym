<template>
	<section id="reservations">
		<h1 class="text-primary-black font-medium text-lg">Reservasi</h1>

		<div class="grid grid-cols-12 p-10 gap-4">
            <div class="col-span-8 border border-primary-grey rounded">
                <Calendar v-model="form.date" :selected-dates="selectedDates" />
            </div>

            <div class="col-span-4 border border-primary-grey rounded">
                <form class="mb-6 p-8" @submit.prevent="onReservation">
                    <div class="mb-3">
                        <label for="room" class="mb-1 inline-block font-semibold text-sm text-black">
                            Pilih Ruangan
                        </label>

                        <select 
                            id="room" 
                            v-model="form.room" 
                            required
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option v-for="(room, key) in rooms" :key="key" :value="room">{{ room }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="telephone" class="mb-1 inline-block font-semibold text-sm text-black">
                            No Telephone
                        </label>

                        <input 
                            id="npm" 
                            v-model="form.telephone" 
                            type="text"
                            class="p-2.5 w-full border rounded border-primary-grey bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                            required
                        >
                    </div>
                    <div class="mb-3">
                        <label for="startTime" class="mb-1 inline-block font-semibold text-sm text-black">
                            Dari Jam
                        </label>
                        <input 
                            id="email" 
                            v-model="form.startTime" 
                            type="time"
                            class="p-2.5 w-full border rounded border-primary-grey bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                            required
                        >
                    </div>
                    <div class="mb-3">
                        <label for="endTime" class="mb-1 inline-block font-semibold text-sm text-black">
                            Sampai Jam
                        </label>
                        <input 
                            id="endTime" 
                            v-model="form.endTime" 
                            type="time"
                            class="p-2.5 w-full border rounded border-primary-grey bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                            required
                        >
                    </div>
                    <div>
                        <button 
                            type="submit"
                            class="p-2.5 w-full rounded bg-primary-blue font-semibold text-sm text-white hover:bg-light-700 focus:outline-none focus:bg-light-700 transition-colors"
                        >
                            Reservasi
                        </button>
                    </div>
                </form>
            </div>
		</div>
	</section>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs'
import type { ReservationRequest } from '~/types/request/reservation.request'
import type { Reservation } from '~/types/reservation.type'
import type { ApiResponse } from '~/types/response.type'

definePageMeta({
  middleware: ['auth'],
})

const year = dayjs().format('YYYY')
const month = dayjs().format('MM')

const { data: reservations, status, error, refresh } = await useFetch<ApiResponse<Reservation[]>>('/api/reservations', {
    method: 'GET',
    params: {
        month,
        year
    }
})

const rooms = ['Gym A', 'Gym B', 'Gym C']

const selectedDates = computed(() => reservations.value?.data.map((val) => val.date))

const form = reactive<ReservationRequest>({
    date: '',
    room: null,
    telephone: null,
    startTime: null,
    endTime: null
})

const onReservation = async () => {
    const { data, error } = await useFetch('/api/reservations', {
        method: 'POST',
        body: form
    })

    if (error.value) {
        console.error(error.value)
    }
}
</script>