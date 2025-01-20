<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<script lang="tsx" setup>
const colorMode = useColorMode()

colorMode.preference = 'light'
</script>