import 'react-i18next';

declare module 'react-i18next' {
	interface Resources {
		common: typeof import('../public/locales/en/common.json');
	}
}
