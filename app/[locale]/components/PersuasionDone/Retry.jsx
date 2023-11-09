import { useTranslations } from 'next-intl'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

import { useAnimation } from '@/utils/hooks/useAnimation'
import { setCardHand, setPlayFromScenario } from '../../api/storage'
import styles from './Retry.module.scss'
import { OwlDialogue, Button } from '../../components'
import Replay from '../../components/Icons/Replay'

const Retry = ({ message, onReplay, isScenarioMode }) => {
  const { t } = useTranslation('common', { keyPrefix: 'owl.persuasiondone' })
  const navigate = useNavigate()
  const [animateReplay, triggerReplay] = useAnimation({ rotation: -40 })

  function gotoHome() {
    onReplay()
    setCardHand([])
    navigate('/home')
  }

  function goToScenarios() {
    // reset game mode in case user goes to play standard game
    setPlayFromScenario(false)
    setCardHand([])
    navigate('/scenarios')
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
            variant='secondary'
            onClick={onReplay}
            onMouseEnter={triggerReplay}
            size='small'
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
