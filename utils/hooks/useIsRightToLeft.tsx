import { useOptionsContext } from '@/contexts/OptionsContext'

const useIsRightToLeft = () => {
  const { options } = useOptionsContext()
  const textShouldRenderFromRightToLeft = options.language === 'ar'
  return textShouldRenderFromRightToLeft
}

export default useIsRightToLeft
