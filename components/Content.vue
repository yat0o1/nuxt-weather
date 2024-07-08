<template>
    <div class="md:text-md lg:text-lg">
      <div class="py-5 flex flex-col items-center justify-center gap-4 
      xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <input v-model="cityInput" class="w-40 sm:w-56 md:w-80 lg:w-96
         text-darkblue bg-gradient-to-b from-blue-200 to-white from-60% rounded-3xl p-2 border-2 border-darkblue
         placeholder:text-gray focus:outline-none hover:shadow-[0px_2px_1px_0_#1A365DB3] hover:scale-105
         focus:from-40% transition-all duration-250 ease-out" type="text" :placeholder="$t('searchCityInput')">
        <button @click="fetch" class="max-w-full bg-gradient-to-b from-blue-200 to-white from-60%
         px-4 py-2 rounded-3xl border-2 border-darkblue 
         hover:shadow-[0px_2px_1px_0_#1A365DB3] hover:scale-110
         active:from-40% transition-all duration-250
         ">{{ $t('searcCityBtn') }}</button>
      </div>
      
        <div :class="['rounded-xl py-4 px-4 my-4 shadow-[1px_1px_2px_1px_#1a5b78]', 
          {'w-48 mx-auto': !validateCityName || emptyInput || loading },
          {'mx-12': validateCityName}]">

          <div v-if="loading" class="flex justify-center items-center">
            <p class="text-center">{{ $t('loadingInput') }}...</p>
          </div>  

          <div v-else-if="validateCityName">
              <p class="mb-4 text-center text-lg">{{ $t('cityOutput') }} {{ weather.city.name }}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="(w, index) in weather.list.slice(0, 12)" :key="index" class="rounded-lg pl-auto py-2 border-2
                  border-darkblue bg-gradient-to-tl from-blue-300 to-white from-50% text-center
                  transition-all duration-400
                hover:border-white hover:bg-gradient-to-br hover:from-blue-300 hover:to-white hover:from-50% hover:scale-110
                  cursor-pointer" @click="weatherCard()">
                  <div class="flex justify-center gap-4">
                    <p>{{ formatDate(w.dt) }}</p>
                    <p>{{ formatTime(w.dt) }}</p>
                  </div>
                  <p>{{ w.main.temp }} °C</p>
                  <p>{{ $t('humidity') }}: {{ w.main.humidity }}%</p>
                  <p>{{ $t('wind') }}: {{ w.wind.speed }} m/s</p>
                <div class="container flex items-center justify-center gap-2">
                  <img loading="lazy" :src="`http://openweathermap.org/img/wn/${w.weather[0].icon}.png`" alt="Weather Icon">
                  <p>{{ w.weather[0].description[0].toUpperCase() + w.weather[0].description.slice(1) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="!emptyInput && !validateCityName">
            <p class="text-center">{{ $t('invalidInput') }}</p>
          </div>

          <div v-else>
            <p class="text-center">{{ $t('emptyInput') }}</p>
          </div>
      </div>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const loading = ref(false);
  const weather = ref(null);
  const cityInput = ref("");
  const validateCityName = ref(false);
  const emptyInput = ref(true);
  const fetch = async () => {
    if(cityInput.value.trim() === ""){
    emptyInput.value = true;
    validateCityName.value = false;
    return;
  } else {
    emptyInput.value = false;
  }
    const queryLang = t('apiQueryLang');
    const APIurl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&lang=${queryLang}&units=metric&appid=558b78ca16ea4320914fbd390ac3a259`;
  try {
    loading.value = true;
    const response = await axios.get(APIurl);
    weather.value = response.data;
    validateCityName.value = true;
    emptyInput.value = false;
  } catch (error) {
    validateCityName.value = false;
    console.error('Error fetching weather data:', error);
  }
  finally {
    loading.value = false;
  }
};

const formatDate = (timestamp) => {
  const localTime = new Date((timestamp * 1000) + weather.value.city.timezone * 1000);
  return (localTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })).replaceAll("/", '.');
  
};

const formatTime = (timestamp) => {
  const localTime = new Date((timestamp * 1000) + weather.value.city.timezone * 1000);
  return localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
};
</script>