export const fallbackLng = 'en'
export const languages = [fallbackLng, 'es']
export const defaultNS = 'common'

export const cookieName = 'i18next'
export const headerName = 'x-i18next-current-language'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
	return {
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS: ns,
		ns,
	}
}
