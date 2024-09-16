import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { setCardHand, setPlayFromScenario } from '@/api/storage'
import { useRouter } from '@/i18n/routing'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button } from '../Button'
import { Replay } from '../Icons/Replay'
import { OwlDialogue } from '../OwlDialogue'
import styles from './Retry.module.scss'

type Props = {
  message: {
    heading: string
    body: string
  }
  onReplay: () => void
  isScenarioMode: boolean
}

export const Retry = ({ message, onReplay, isScenarioMode }: Props) => {
  const t = useTranslations('Owl.persuasiondone')
  const router = useRouter()
  const [animateReplay, triggerReplay] = useAnimation({ rotation: -40 })

  function gotoHome() {
    onReplay()
    setCardHand([])
    router.push('/home')
  }

  function goToScenarios() {
    // reset game mode in case user goes to play standard game
    setPlayFromScenario(false)
    setCardHand([])
    router.push('/scenarios')
  }

  return (
    <div className={styles.retry}>
      <OwlDialogue
        heading={message.heading}
        body={message.body}
        hasOwnSound
        onClick={isScenarioMode ? goToScenarios : gotoHome}
        cta={isScenarioMode ? t('toscenarios') : t('tohome')}
        secondButton={
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={onReplay}
            onMouseEnter={triggerReplay}
            size={ButtonSize.SMALL}
          >
            {t('retry')}
            <motion.span animate={animateReplay}>
              <Replay />
            </motion.span>
          </Button>
        }
      ></OwlDialogue>
    </div>
  )
}

export default Retry
