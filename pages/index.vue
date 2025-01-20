<template>
	<section id="home">
		<h1 class="text-primary-black font-medium text-lg">Reservasi Hari Ini</h1>

		<div class="flex flex-wrap items-center justify-center gap-8 p-10" v-if="status == 'success'">
			<div v-for="(reservation, key) in data?.data" :key="key" class="flex flex-col items-center justify-center gap-y-2 w-48 h-24 rounded-md bg-primary-orange text-white">
				<span class="font-semibold">{{ reservation.room }}</span>
				<span class="font-medium">{{ reservation.startTime }} - {{ reservation.endTime }}</span>
			</div>
		</div>
	</section>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs';
import type { Reservation } from '~/types/reservation.type';
import type { ApiResponse } from '~/types/response.type';

definePageMeta({
  middleware: ['auth'],
});

const { data, status, error, refresh } = await useFetch<ApiResponse<Reservation[]>>('/api/reservations', {
	method: 'GET',
	params: {
		date: dayjs().format('YYYY-MM-DD')
	}
})
</script>