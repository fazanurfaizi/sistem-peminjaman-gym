<template>
    <div class="flex flex-row h-screen overflow-hidden bg-white text-black">
        <!-- Main content -->
        <div class="flex flex-col flex-1 overflow-y-auto">
            <Suspense>
                <div class="p-10">
                    <slot />
                </div>

                <template #fallback>
                    <div class="flex justify-center items-center h-full text-slate-500">
                        <h1>Loading...</h1>
                    </div>
                </template>
            </Suspense>
        </div>        
    </div>
</template>