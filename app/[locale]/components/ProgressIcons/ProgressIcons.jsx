import styles from './ProgressIcons.module.scss'

const ProgressIcons = ({ progress }) => {
  return (
    <g 
      id="f26c1fa6-d3fc-4952-9b1c-d5316b2735b3" 
      data-name="KNAPPAR"
      className={styles.wrapper}
    >
      <path className={styles.background} d="M3491.4,2088.7a29.25,29.25,0,1,1,29.3-29.3A29.26,29.26,0,0,1,3491.4,2088.7Z" />
      <path className={styles.frame} d="M3491.4,2031.7a27.8,27.8,0,1,1-27.8,27.8,27.8,27.8,0,0,1,27.8-27.8m0-3a30.8,30.8,0,1,0,30.8,30.8,30.81,30.81,0,0,0-30.8-30.8Z" />
      <text 
        transform="translate(3474 2069.19)" 
        style={{ fontFamily: 'bangers, Arial' }}
      >
        {progress['afterSchool']?.defeated || 0}/{progress['afterSchool']?.total || 0}
      </text>
      
      <path className={styles.background} d="M3270.9,1960a29.2,29.2,0,1,1,29.3-29.2A29.23,29.23,0,0,1,3270.9,1960Z" />
      <path className={styles.frame} d="M3270.9,1903a27.8,27.8,0,1,1-27.8,27.8,27.8,27.8,0,0,1,27.8-27.8m0-3a30.8,30.8,0,1,0,30.8,30.8,30.81,30.81,0,0,0-30.8-30.8Z" />
      <text 
        transform="translate(3252.5 1940.44)" 
        style={{ fontFamily: 'bangers, Arial' }}
      >
        {progress['school']?.defeated || 0}/{progress['school']?.total || 0}
      </text>
      
      <path className={styles.background} d="M2814.7,1918.6a29.2,29.2,0,1,1,29.3-29.2A29.23,29.23,0,0,1,2814.7,1918.6Z" />
      <path className={styles.frame} d="M2814.7,1861.6a27.8,27.8,0,1,1-27.8,27.8,27.8,27.8,0,0,1,27.8-27.8m0-3a30.8,30.8,0,1,0,30.8,30.8,30.81,30.81,0,0,0-30.8-30.8Z" />
      <text 
        transform="translate(2797 1899.1)" 
        style={{ fontFamily: 'bangers, Arial' }}
      >
        {progress['activities']?.defeated || 0}/{progress['activities']?.total || 0}
      </text>
      
      <path className={styles.background} d="M3356.5,1640.1a29.25,29.25,0,1,1,29.3-29.3A29.26,29.26,0,0,1,3356.5,1640.1Z" />
      <path className={styles.frame} d="M3356.5,1583.1a27.8,27.8,0,1,1-27.8,27.8,27.8,27.8,0,0,1,27.8-27.8m0-3a30.8,30.8,0,1,0,30.8,30.8,30.81,30.81,0,0,0-30.8-30.8Z" />
      <text 
        transform="translate(3334 1620.55)" 
        style={{ fontFamily: 'bangers, Arial' }}
      >
        {progress['home']?.defeated || 0}/{progress['home']?.total || 0}
      </text>
      
      <path className={styles.background} d="M3065.9,1447.6a29.25,29.25,0,1,1,29.2-29.3A29.26,29.26,0,0,1,3065.9,1447.6Z" />
      <path className={styles.frame} d="M3065.9,1390.6a27.8,27.8,0,1,1-27.8,27.8,27.8,27.8,0,0,1,27.8-27.8m0-3a30.8,30.8,0,1,0,30.8,30.8,30.81,30.81,0,0,0-30.8-30.8Z" />
      <text 
        transform="translate(3048.41 1428.05)" 
        style={{ fontFamily: 'bangers, Arial' }}
      >
        {progress['world']?.defeated || 0}/{progress['world']?.total || 0}
      </text>
    </g>
  )
}

export default ProgressIcons