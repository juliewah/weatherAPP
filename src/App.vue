<script setup>
import PlaceAndDate from './components/PlaceAndDate.vue'
import Temperature from './components/Temperature.vue'
import { ref, onMounted } from 'vue'
import { useWeatherStore } from './stores/currentWeather.js'

const location = ref(null)
const error = ref(null)
const weatherData = ref(null)

const weatherStore = useWeatherStore()

const getLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      weatherStore.setLocation(position.coords)
      resolve(position)
    },
    (err) => {
      weatherStore.setErrorMsg(`無法取得位置：${err.message}`)
      reject(err)
    }
  )
})

onMounted(async () => {
  await getLocation()
  if(weatherStore.location){
    await weatherStore.fetchWeatherData()
    await weatherStore.fetchLocation()
  }
})
</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen bg-blue-400 ">
    <PlaceAndDate />
    <Temperature />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
