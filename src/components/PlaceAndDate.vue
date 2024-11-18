<template>
    <div class="flex flex-col text-center gap-y-2">
        <h1 class="text-xl font-semibold text-white">{{ city }}</h1>
        <p class="text-lg text-white">{{ currentDate }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/currentWeather.js'
import dayjs from 'dayjs'

const weatherStore = useWeatherStore()
const { city } = storeToRefs(weatherStore)

const now = dayjs()
const currentDate = ref(now.format('dddd, D MMMM'))
</script>