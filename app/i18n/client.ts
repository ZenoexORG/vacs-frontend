'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions } from './config'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.use(
		resourcesToBackend((lng, ns) =>
			import(`./locales/${lng}/${ns}.json`)
		)
	)
	.init({
		...getOptions(),
		ns: ['common'],
		fallbackNS: 'common',
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: [],
	})

export default i18n
