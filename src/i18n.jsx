
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next'
import en from './Language/en/english.json'
import fr from './Language/fr/French.json'

i18n.use(initReactI18next).init({
    resources:{
        en:{translation:en},
        fr:{translation:fr}
    },
    fallbackLn:'en',
    interpolation:{
        escapeBalue:false
    }
})

export default i18n;