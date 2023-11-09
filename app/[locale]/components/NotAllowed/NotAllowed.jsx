import { useTranslations } from 'next-intl'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { Link } from '../'
import HomeIcon from '../../components/Icons/HomeIcon'
import styles from './NotAllowed.module.scss'

const NotAllowed = () => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ y: -2 })

  return (
    <>
      <Helmet>
        <title>{t('common:meta:title:lootbox')}</title>
      </Helmet>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: 'url("./images/start/map-large.svg")' }}
      >
        <div className={styles.blurBkgd} />
        <div className={styles.opacityBkgd} />
        <div className={styles.content}>
          <h1>{t('common:notallowed:title')}</h1>
          <p>{t('common:notallowed:description1')}</p>
          <p>{t('common:notallowed:description2')}</p>
          <Link
            variant={ButtonVariant.PRIMARY}
            to='/home'
            onMouseEnter={trigger}
          >
            {t('common:mainmenu:home')}
            <motion.span animate={animate}>
              <HomeIcon />
            </motion.span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotAllowed
