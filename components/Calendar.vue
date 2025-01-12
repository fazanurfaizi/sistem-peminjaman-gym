<template>
    <div class="p-2">
        <div class="flex justify-between items-center mb-4">
            <button @click="shifMonth(-1)">Previous</button>
            <div class="text-center">
                <h1 class="font-bold text-xl">{{ viewDate.format('MMMM YYYY') }}</h1>
            </div>
            <button @click="shifMonth(1)">Next</button>
        </div>

        <div class="grid grid-cols-7 gap-1">
            <span v-for="(day, key) in weekDays" :key="`week-${key}`" class="text-center font-bold">
                {{ day }}
            </span>
        </div>

        <div class="grid grid-cols-7">
            <div v-for="(_, key) in daysToPrepend" :key="`prepend-${key}`"></div>
            <div 
                v-for="(day, key) in units" 
                :key="`day-${key}`" 
                class="flex flex-col justify-center items-center h-24 rounded m-1 cursor-pointer"
                :class="{
                    'hover:text-primary-blue hover:bg-secondary-blue hover:text-opacity-100 hover:bg-opacity-50': day.isAfter(dayjs().subtract(1, 'day')),
                    'text-primary-blue bg-secondary-blue text-opacity-100 bg-opacity-50': selectedDates.includes(day.format('YYYY-MM-DD')) || modelValue == day.format('YYYY-MM-DD')
                }"
                @click="onSelectDay(day)"
            >
                <span class="text-center font-medium">{{ day.format('D') }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface IProps {
    modelValue: string;
    startDate?: string;
    selectedDates?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
    modelValue: () => '',
    startDate: () => dayjs().format('YYYY-MM-DD'),
    selectedDates: () => []
})

const emits = defineEmits(['update:modelValue'])

const weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]

const viewDate = ref(dayjs(props.startDate))

const units = computed(() => {
    let ranges = []
    let startOfRange = viewDate.value.startOf('month').add(-1, 'day')
    let endOfRange = viewDate.value.endOf('month').add(-1, 'day')

    let currentDate = startOfRange

    while (currentDate.isBefore(endOfRange) || currentDate.isSame(endOfRange)) {
        currentDate = currentDate.add(1, 'day')
        ranges.push(currentDate)
    }

    return ranges
})

const daysToPrepend = computed(() => {
    const startOfMonth = viewDate.value.startOf('month')
    const startOfFirstWeek = startOfMonth.startOf('week')
    const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day')
    return Array.from(new Array(daysToFirstDay).keys())
})

const shifMonth = (month: number) => {
    viewDate.value = viewDate.value.add(month, 'month')
}

const onSelectDay = (day: dayjs.Dayjs) => {
    if (day.isBefore(dayjs().subtract(1, 'day'))) return

    const date = day.format('YYYY-MM-DD')
    emits('update:modelValue', date)
}
</script>