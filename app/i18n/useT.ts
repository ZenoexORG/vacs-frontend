'use client'

import i18n from './client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useT(ns?: string) {
	const { lng } = useParams()

	useEffect(() => {
		if (lng && i18n.language !== lng) {
			i18n.changeLanguage(lng)
		}
	}, [lng])

	return useTranslation(ns)
}
