import { useState } from 'react'
import { useOptionsContext } from '@/contexts/OptionsContext'
import Home from './Environments/Home'
import Roads from './Environments/Roads'
import School from './Environments/School'
import Play from './Environments/Play'
import World from './Environments/World'
import Activities from './Environments/Activities'
import ProgressIcons from '../ProgressIcons/ProgressIcons'
import { MapDescription } from '../MapDescription'
import styles from './Map.module.scss'

export const Map = ({ onClick, progress = {}, playable = [] }) => {
  const { clientHeight, clientWidth } = useOptionsContext()
  const [describedEnv, setDescribedEnv] = useState()
  const isNarrowScreen = clientWidth / clientHeight < 1.3
  const isPlayableMap = !!playable.length

  //TODO: use highlightEnv ('school') to highlight newly won env

  function getIsPlayable(environment) {
    const isPlayableEnv = playable.find(
      (antagonist) => antagonist.environment === environment
    )
    return isPlayableEnv
  }

  function getSaturation(environment) {
    if (!playable.length) {
      const defeated = progress[environment]?.defeated
      const total = progress[environment]?.total
      const value = defeated / total || 0
      return value
    }
    if (getIsPlayable(environment)) {
      return 1
    } else {
      return 0
    }
  }

  function handleClick(environment) {
    if (!isPlayableMap && !isNarrowScreen) {
      setDescribedEnv(environment)
      return
    }
    if (!getIsPlayable(environment)) {
      return
    }
    onClick(environment)
  }

  return (
    <section
      className={`${styles.wrapper} ${
        !isPlayableMap && !isNarrowScreen && styles.describable
      }`}
    >
      {describedEnv && (
        <MapDescription
          environment={describedEnv}
          onClose={() => setDescribedEnv()}
        />
      )}

      <svg
        xmlns='http://www.w3.org/2000/svg'
        role='img'
        aria-labelledby='mapTitle'
        fill='none'
        viewBox='0 0 6244.44 3666.65'
        className={styles.map}
      >
        <title id='mapTitle'>Karta över spelbara platser</title>
        <filter id='saturate-school' filterUnits='objectBoundingBox'>
          <feColorMatrix
            type='saturate'
            in='SourceGraphic'
            values={getSaturation('school')}
          />
        </filter>
        <g
          onClick={() => handleClick('school')}
          id='school'
          filter='url(#saturate-school)'
        >
          <School />
          <polygon
            className={getIsPlayable('school') && styles.highlight}
            style={{ opacity: 0 }}
            points='3611.43 2322.7 2738.64 2331.2 2738.64 1174.1 3611.43 1165.5 3611.43 2322.7'
          />
        </g>
        <filter id='saturate-home' filterUnits='objectBoundingBox'>
          <feColorMatrix
            type='saturate'
            in='SourceGraphic'
            values={getSaturation('home')}
          />
        </filter>
        <g
          onClick={() => handleClick('home')}
          id='home'
          filter='url(#saturate-home)'
        >
          <Home />
          <g
            className={getIsPlayable('home') && styles.highlight}
            style={{ opacity: 0 }}
          >
            <path d='M3168.54,1446.3l329.7,631.6,3247.4,829,1.1-1856.2-2903.3,262.2s-335.2-32.1-438.4,12.6C3304,1369.3,3168.54,1446.3,3168.54,1446.3Z' />
          </g>
        </g>
        <filter id='saturate-afterSchool' filterUnits='objectBoundingBox'>
          <feColorMatrix
            type='saturate'
            in='SourceGraphic'
            values={getSaturation('afterSchool')}
          />
        </filter>
        <g
          onClick={() => handleClick('afterSchool')}
          id='afterSchool'
          filter='url(#saturate-afterSchool)'
        >
          <Play />
          <g
            className={getIsPlayable('afterSchool') && styles.highlight}
            style={{ opacity: 0 }}
          >
            <path d='M3037.44,2193.3s277.1-178,330.4-203.4,103.7-34,188-19.4,424.8,214.1,761.9,282.2c161.9,32.7,514.1,99.3,841.3,93.5,270-4.8,691.6-25,975.7,29.2,315.1,60.2,750.7,223.9,750.7,223.9l-24.8,1880.5-2758-9.5Z' />
            <path d='M5565.14,2752.1c5.4,127.5-82.8,123.1-228.7,85.7-147.71-37.9-247.3-14.8-306.9-93.2s-15.5-241.4,179-234.7c117.9,4,201.7,62.5,244.79,99.2C5515.14,2661.5,5563.24,2706.9,5565.14,2752.1Z' />
          </g>
        </g>
        <filter id='saturate-activities' filterUnits='objectBoundingBox'>
          <feColorMatrix
            type='saturate'
            in='SourceGraphic'
            values={getSaturation('activities')}
          />
        </filter>
        <g
          onClick={() => handleClick('activities')}
          id='activities'
          filter='url(#saturate-activities)'
        >
          <Activities />
          <path
            className={getIsPlayable('activities') && styles.highlight}
            style={{ opacity: 0 }}
            d='M-500.66,1584s546.9-105.1,877.8-84.9c471.6,28.7,1193,240.4,1521.1,259.2,425.8,24.5,701.1-14,806.6-1.2,64.2,7.8,123.9,22,163,106.8,33.9,73.4,1006.8,2008.4,1006.8,2008.4L-500.56,3943V1584Z'
          />
        </g>
        <filter id='saturate-world' filterUnits='objectBoundingBox'>
          <feColorMatrix
            type='saturate'
            in='SourceGraphic'
            values={getSaturation('world')}
          />
        </filter>
        <g
          onClick={() => handleClick('world')}
          id='world'
          filter='url(#saturate-world)'
        >
          <World />
          <g
            className={getIsPlayable('world') && styles.highlight}
            style={{ opacity: 0 }}
          >
            <path d='M-541.46,1597.4s462.2-114.7,913.1-93.3c479.7,22.7,885.9,182.5,1467.2,249.1,235,26.9,767-2.2,819.4-2.5,79.9-.5,160.8,35.9,160.8,35.9s551.6-302.7,583.6-318.7c79.1-39.5,146.6-46.2,189.3-44.9,73.5,2.2,661.4,52.8,1178.3,52.8,445.3,0,764.4-80.2,1066.2-169.6,536.5-158.8,899.5-90,899.5-90L6761-565.3-541.17-534.8Z' />
          </g>
        </g>
        <g id='Vägar'>
          <Roads />
        </g>
        <ProgressIcons progress={progress} />
      </svg>
    </section>
  )
}
