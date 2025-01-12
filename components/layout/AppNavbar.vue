<template>
    <div class="flex items-center justify-end h-14 bg-white border-b border-primary-blue">
        <div class="flex items-center pr-4 h-12">
            <ul aria-label="top bar right" aria-orientation="horizontal" class="px-8 flex items-center gap-x-4">
                <li class="flex justify-start items-center gap-x-4 h-8 ml-3">
                    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
                        <button class="h-8 w-8 rounded-full bg-primary-blue border focus:outline-none focus:shadow-outline">
                            <IconUser class="h-full w-full rounded-full mx-auto text-white" />
                        </button>

                        <template #signout="{ item }">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                        </template>
                    </UDropdown>
                    <span class="text-secondary-grey">
                        {{ user?.name }}
                    </span>
                </li>

                <li class="h-8 w-8 ml-3 flex justify-center items-center">
                    <button class="w-full h-full text-gray-500 focus:outline-none focus:shadow-outline">
                        <IconBell class="fill-current w-5 h-5 mx-auto" />                        
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="tsx">
import IconBell from '~/assets/icons/bell.svg'
import IconUser from '~/assets/icons/user.svg'

const items = [
    [{
        label: 'Sign out',
        slot: 'signout',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: () => {
            onLogout()
        }
    }]
]

const { user, me, logout } = useAuth()

const onGetMe = async () => {
    try {
        await me()
    } catch (error) {
        throw error
    }
}

const onLogout = async () => {
    try {
        console.log('logout')
        await logout()
    } catch (error) {
        throw error
    }
}

onMounted(() => {
    onGetMe()
})
</script>