import { defineStore } from "pinia"
import { ref } from 'vue'

export const useWeatherStore = defineStore('weatherInfo', () => {
    const location = ref(null)
    const errorMsg = ref(null)
    const currentWeather = ref({})
    const city = ref(null)

    const setLocation = (newLocation) => {
        //取得目前地點
        location.value = newLocation
    }
    const setErrorMsg = (msg) => {
        //儲存錯誤訊息
        errorMsg.value = msg
    }

    const setCurrentWeather = (weather) => {
        //取得目前天氣
        currentWeather.value = weather
    }

    const setCity = (newCity) => {
        //取得城市
        city.value = newCity
    }

    const fetchLocation = async () => {
        if(location.value){
            const apiUrl = import.meta.env.VITE_GEOCODING_API_URL
            const apiKey = import.meta.env.VITE_GEOCODING_API_KEY
            const { latitude, longitude } = location.value

            try {
                const res = await fetch(`${apiUrl}latlng=${latitude},${longitude}&key=${apiKey}&language=en`)
                const json = await res.json()
                const cityComponent = json.results
                    .flatMap((result) => result.address_components)
                    .find((component) => component.types.includes('locality'))

                if(cityComponent){
                    setCity(cityComponent.long_name)
                } else {
                    console.log('沒找到city')
                }
            } catch(err) {
                console.log(err)
                errorMsg.value = err.message
            }
        }
    }

    const fetchWeatherData = async () => {
        if(location.value){
            const apiUrl = import.meta.env.VITE_WEATHER_API_URL
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY
            const error = ref(null)
            try{
                const res = await fetch(
                    `${apiUrl}lat=${location.value.latitude}&lon=${location.value.longitude}&units=metric&appid=${apiKey}`
                )
                const json = await res.json()
                Object.assign(currentWeather.value, {
                    temp: json.main.temp,
                    description: json.weather[0].description,
                    icon: json.weather[0].icon,
                });
            } catch(err) {
                error.value = err.message
                console.log(error)
            }
        }
    }

    return {
        location,
        errorMsg,
        currentWeather,
        city,
        setLocation,
        setErrorMsg,
        setCurrentWeather,
        setCity,
        fetchWeatherData,
        fetchLocation,
    }
})