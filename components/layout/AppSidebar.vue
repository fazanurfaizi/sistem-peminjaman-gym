<template>
    <!-- sidebar -->
    <div class="hidden md:flex flex-col w-64 bg-primary-grey">
        <div class="flex items-center justify-center h-16 gap-x-2">
            <div
                class="flex justify-center items-center w-8 h-8 text-white bg-primary-blue rounded-full p-2"
            >
                W
            </div>
            <span class="text-primary-blue font-bold uppercase">Peminjaman Gym</span>
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-primary-grey">
                <div class="flex items-center px-4 py-2">
                    <span class="text-secondary-grey">
                        Menu
                    </span>
                </div>

                <template v-for="item in menuItems" :key="item.name">
                    <nuxt-link :to="item.link" class="flex items-center px-4 py-2 text-secondary-grey hover:text-primary-blue hover:bg-secondary-blue hover:text-opacity-100 hover:bg-opacity-50">
                        <component 
                            :is="item.icon" 
                            class="h-6 w-6 mr-2" 
                            fill="currentColor"
                        />
                        {{ item.name }}
                    </nuxt-link>
                </template>
            </nav>
        </div>
    </div>
</template>

<script setup>
import IconHome from '~/assets/icons/home.svg'
import IconLayers from '~/assets/icons/layers.svg'
import IconCalendar from '~/assets/icons/calendar.svg'

const menuItems = [
    { name: 'Home', link: '/home', icon: IconHome },
    { name: 'Jadwal', link: '/schedules', icon: IconLayers },
    { name: 'Reservasi', link: '/reservations', icon: IconCalendar },
];
</script>