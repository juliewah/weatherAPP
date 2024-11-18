<script setup>
import { Cloud } from '@iconoir/vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/currentWeather'

const weatherStore = useWeatherStore()
const { currentWeather } = storeToRefs(weatherStore)
console.log("123",currentWeather.value)
</script>

<template>
    <div class="flex flex-col items-center">
        <!-- <Cloud color="#FFFFFF" height="60" width="60" /> -->
        <img v-if="currentWeather" :src="`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`"
            class="w-40 h-40">
        <img v-else :src="`https://openweathermap.org/img/wn/01d@2x.png`" class="h-40 w-30">

        <div class="flex flex-col items-center gap-y-4" v-if="currentWeather">
            <p class="text-4xl font-bold text-white">{{ currentWeather.temp }}°C</p>
            <p class="text-lg text-gray-300">{{ currentWeather.description }}</p>
        </div>
        <div class="flex flex-col items-center" v-else>
            <p class="text-4xl font-bold text-white">12.34°C</p>
            <p class="text-lg text-gray-100">a little bit cold</p>
        </div>
    </div>
</template>