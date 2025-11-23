'use client'

import { useEffect } from 'react'

import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface DeviceTrackerProps {
  deviceType: DeviceType
}

export const DeviceTracker: React.FC<DeviceTrackerProps> = ({ deviceType }) => {
  // Map device type to collection name
  const collectionName =
    deviceType === 'mobile'
      ? STAT_COLLECTION_NAMES.DEVICE_MOBILE
      : deviceType === 'tablet'
      ? STAT_COLLECTION_NAMES.DEVICE_TABLET
      : STAT_COLLECTION_NAMES.DEVICE_DESKTOP

  const trackDevice = useAddToStatistics(
    collectionName,
    STAT_FLAGS.HAS_TRACKED_DEVICE
  )

  useEffect(() => {
    trackDevice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
