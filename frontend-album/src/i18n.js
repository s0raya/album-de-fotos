import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'en',
    resources: {
        es: {
            translation: {
                // Descripciones del tiempo de Open-Meteo
                "Clear sky": "Cielo despejado",
                "Mainly clear": "Mayormente despejado",
                "Partly cloudy": "Parcialmente nublado",
                "Overcast": "Nublado",
                "Fog": "Niebla",
                "Depositing rime fog": "Niebla con escarcha",
                "Light drizzle": "Llovizna ligera",
                "Moderate drizzle": "Llovizna moderada",
                "Dense drizzle": "Llovizna densa",
                "Light freezing drizzle": "Llovizna helada ligera",
                "Dense freezing drizzle": "Llovizna helada densa",
                "Slight rain": "Lluvia ligera",
                "Moderate rain": "Lluvia moderada",
                "Heavy rain": "Lluvia intensa",
                "Light freezing rain": "Lluvia helada ligera",
                "Heavy freezing rain": "Lluvia helada intensa",
                "Slight snow fall": "Nevada ligera",
                "Moderate snow fall": "Nevada moderada",
                "Heavy snow fall": "Nevada intensa",
                "Snow grains": "Granos de nieve",
                "Slight rain showers": "Chubascos de lluvia ligeros",
                "Moderate rain showers": "Chubascos de lluvia moderados",
                "Violent rain showers": "Chubascos de lluvia violentos",
                "Slight snow showers": "Chubascos de nieve ligeros",
                "Heavy snow showers": "Chubascos de nieve intensos",
                "Thunderstorm": "Tormenta",
                "Thunderstorm with slight hail": "Tormenta con granizo ligero",
                "Thunderstorm with heavy hail": "Tormenta con granizo intenso",
                "Unknown": "Desconocido",
                "N/A": "N/A"
            },
        },
        en: {
            translation: {
                // Mantener las claves en inglés como fallback
                "Clear sky": "Clear sky",
                "Mainly clear": "Mainly clear",
                "Partly cloudy": "Partly cloudy",
                "Overcast": "Overcast",
                "Fog": "Fog",
                "Depositing rime fog": "Depositing rime fog",
                "Light drizzle": "Light drizzle",
                "Moderate drizzle": "Moderate drizzle",
                "Dense drizzle": "Dense drizzle",
                "Light freezing drizzle": "Light freezing drizzle",
                "Dense freezing drizzle": "Dense freezing drizzle",
                "Slight rain": "Slight rain",
                "Moderate rain": "Moderate rain",
                "Heavy rain": "Heavy rain",
                "Light freezing rain": "Light freezing rain",
                "Heavy freezing rain": "Heavy freezing rain",
                "Slight snow fall": "Slight snow fall",
                "Moderate snow fall": "Moderate snow fall",
                "Heavy snow fall": "Heavy snow fall",
                "Snow grains": "Snow grains",
                "Slight rain showers": "Slight rain showers",
                "Moderate rain showers": "Moderate rain showers",
                "Violent rain showers": "Violent rain showers",
                "Slight snow showers": "Slight snow showers",
                "Heavy snow showers": "Heavy snow showers",
                "Thunderstorm": "Thunderstorm",
                "Thunderstorm with slight hail": "Thunderstorm with slight hail",
                "Thunderstorm with heavy hail": "Thunderstorm with heavy hail",
                "Unknown": "Unknown",
                "N/A": "N/A"
            },
        },
    },
    detection: {
        order: ['navigator']
    }
});

export default i18n;