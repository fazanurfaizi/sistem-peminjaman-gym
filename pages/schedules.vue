<template>
	<section id="schedules">
		<h1 class="text-primary-black font-medium text-lg">Daftar Ruangan</h1>

		<div class="flex justify-start gap-x-8">
            <div class="w-64 mb-3">
                <label for="room" class="mb-1 inline-block font-semibold text-sm text-black">
                    Pilih Ruangan
                </label>

                <DatePicker v-model="filter.date" :enable-time-picker="false"></DatePicker>
            </div>

            <div class="w-64 mb-3">
                <label for="room" class="mb-1 inline-block font-semibold text-sm text-black">
                    Pilih Ruangan
                </label>

                <select 
                    id="room" 
                    v-model="filter.room" 
                    required
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option v-for="(room, key) in rooms" :key="key" :value="room">{{ room }}</option>
                </select>
            </div>
        </div>

        <div class="relative mt-5 border border-gray-100 rounded-lg">
            <ClientOnly>
                <EasyDataTable
                    empty-message="No Reservation Found"
                    theme-color="#f97316"
                    table-class-name="eztble"
                    :headers="headers"
                    :items="reservations?.data"
                >
                    <template #item-date="{ date }">
                        <span>{{ date }}</span>
                    </template>

                    <template #item-session="{ startTime, endTime }">
                        <span>{{ `${startTime} - ${endTime}` }}</span>
                    </template>

                    <!-- Action items for table -->
                    <template #item-actions="reservation">
                        <div class="flex space-x-4 text-gray-500">
                            <button>
                                Info
                            </button>
                        </div>
                    </template>
                </EasyDataTable>
            </ClientOnly>
        </div>
	</section>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs';
import type { Header } from 'vue3-easy-data-table';
import type { Reservation } from '~/types/reservation.type';
import type { ApiResponse } from '~/types/response.type';

definePageMeta({
  middleware: ['auth'],
});

const rooms = ['Gym A', 'Gym B', 'Gym C']

const filter = reactive({
    room: '',
    date: new Date()
})


const page = ref(1);
const limit = ref(10);

const headers: Header[] = [
    { text: 'Nama Ruangan', value: 'room', sortable: true },
    { text: 'Tanggal', value: 'date' },
    { text: 'Sesi', value: 'session' },
    { text: 'Actions', value: 'actions' }
];

// const { data: reservations, status, error, refresh } = await useFetch<ApiResponse<Reservation[]>>('/api/reservations', {
//     method: 'GET',
//     params: {
//         room: filter.room,
//         date: dayjs(filter.date).format('YYYY-MM-DD'),
//         page: page.value,
//         limit: limit.value,
//     }
// })

const { data: reservations, status, error } = await useAsyncData<ApiResponse<Reservation[]>>(
    'reservations',
    () => $fetch('/api/reservations', {
        method: 'GET',
        params: {
            room: filter.room,
            date: filter.date ? dayjs(filter.date).format('YYYY-MM-DD') : null,
            page: page.value,
            limit: limit.value,
        }
    }), {
        watch: [filter, page, limit]
    }
)

// const nextPage = () => {
//   if (page.value < reservations?.value?.meta.totalPages!) {
//     page.value++
//     refresh()
//   }
// }

// const prevPage = () => {
//   if (page.value > 1) {
//     page.value--
//     refresh()
//   }
// }
</script>