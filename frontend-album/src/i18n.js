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
                "Thunderstorm with light rain" : "Tormenta con lluvia ligera",
                "Thunderstorm with rain": "Tormenta con lluvia",
                "Thunderstorm with heavy rain": "Tormenta con fuertes lluvias",
                "Thunderstorm with light drizzle": "Tormenta con llovizna ligera",
                "Thunderstorm with drizzle": "Tormenta con llovizna",
                "Thunderstorm with heavy drizzle": "Tormenta con llovizna intensa",
                "Thunderstorm with Hail": "Tormenta con granizo",
                "Light Drizzle": "Llovizna ligera",
                "Drizzle": "Llovizna",
                "Heavy Drizzle": "Llovizna intensa",
                "Light Rain": "Lluvia ligera",
                "Moderate Rain": "Lluvia moderada",
                "Heavy Rain": "Lluvia intensa",
                "Freezing rain": "Lluvia helada",
                "Light shower rain": "Chubascos ligeros",
                "Shower rain": "Chubascos",
                "Heavy shower rain": "Chubascos intensos",
                "Light snow": "Nieve ligera",
                "Snow": "Nieve",
                "Heavy Snow": "Nieve intensa",
                "Mix snow/rain": "Mezcla de nieve/lluvia",
                "Sleet": "Aguanieve",
                "Heavy sleet": "Aguanieve intensa",
                "Snow shower": "Chubascos de nieve",
                "Heavy snow shower": "Chubascos de nieve intensos",
                "Flurries": "Ráfagas de nieve",
                "Mist": "Neblina",
                "Smoke": "Humo",
                "Haze": "Calina",
                "Sand/dust": "Arena/polvo",
                "Fog": "Niebla",
                "Freezing Fog": "Niebla helada",
                "Clear Sky": "Cielo despejado",
                "Few clouds": "Pocas nubes",
                "Scattered clouds": "Nubes dispersas",
                "Broken clouds": "Nubes fragmentadas",
                "Overcast clouds": "Nubes nubladas",
                "Unknown Precipitation": "Precipitación desconocida"
            },
        },
    },
    detection: {
        order: ['navigator']
    }
});

export default i18n;