'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

type DeviceTrackerProps = {
  deviceType: DeviceType
}

export const DeviceTracker: React.FC<DeviceTrackerProps> = ({ deviceType }) => {
  const pathname = usePathname()

  // Map device type to collection name
  const collectionName =
    deviceType === 'mobile'
      ? STAT_COLLECTION_NAMES.DEVICE_MOBILE
      : deviceType === 'tablet'
      ? STAT_COLLECTION_NAMES.DEVICE_TABLET
      : STAT_COLLECTION_NAMES.DEVICE_DESKTOP

  const trackDevice = useAddToStatistics(
    collectionName,
    STAT_FLAGS.SHOULD_TRACK_DEVICE
  )

  useEffect(() => {
    if (!pathname?.endsWith('/stats')) {
      trackDevice()
    }
  }, [pathname, trackDevice])

  return null
}
