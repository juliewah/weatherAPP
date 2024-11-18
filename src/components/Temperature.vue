<script setup>
import { Cloud } from '@iconoir/vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/currentWeather'

const weatherStore = useWeatherStore()
const { currentWeather } = storeToRefs(weatherStore)
console.log(currentWeather)

</script>

<template>
    <div class="flex flex-col items-center mt-10 gap-y-4">
        <!-- <Cloud color="#FFFFFF" height="60" width="60" /> -->
        <img v-if="currentWeather" :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`">
        <img v-else :src="`https://openweathermap.org/img/wn/10d@2x.png`" class="w-40 h-40">
        <div v-if="currentWeather">
            <p class="text-4xl font-bold text-white">{{ currentWeather.temp }}°C</p>
            <p class="text-lg text-gray-300">{{ currentWeather.weather[0].description }}</p>
        </div>
        <div v-else>
            <p class="text-4xl font-bold text-white">26.73°C</p>
            <p class="text-lg text-gray-300">cloudyy</p>
        </div>
    </div>
</template>