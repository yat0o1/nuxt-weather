<template>
    <div class="ml-auto flex flex-row gap-4">
        <span :class="{'border-b-2 border-darkblue': currentLanguage === 'en-US', 'cursor-pointer text-darkblue transition-all duration-250': true}" 
        @click="languageChange('en-US')">en</span>
        <span :class="{'border-b-2 border-darkblue': currentLanguage === 'ru-RU', 'cursor-pointer text-darkblue transition-all duration-250': true}" 
        @click="languageChange('ru-RU')">ru</span>
        <span :class="{'border-b-2 border-darkblue': currentLanguage === 'kk-KZ', 'cursor-pointer text-darkblue transition-all duration-250': true}" 
        @click="languageChange('kk-KZ')">kz</span>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    const { setLocale } = useI18n();
    const currentLanguage = ref('en-US');
    const languageChange = async (lang) => {
        await setLocale(lang);
        currentLanguage.value = lang;
    };
</script>