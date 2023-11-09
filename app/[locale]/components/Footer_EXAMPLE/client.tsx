'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '@/i18n/client'

interface Props {
  lng: string
}

export const Footer: React.FC<Props> = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}
