import { useTranslations } from 'next-intl'

const Hockey = (props) => {
  const t = useTranslations()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='hockey-title'
      xmlSpace='preserve'
      {...props}
    >
      <title id='hockey-title'>
        {t('antagonists.racistTeacher.components.background')}
      </title>
      <defs>
        <clipPath id='hockey-a'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h1920v1080H0z'
          />
        </clipPath>
        <clipPath id='hockey-b'>
          <path
            d='M1490.87 814.56c-7.23 33.48 4.59 72.91 17.85 74 15.37 1.26 231.32-.87 240.66-1.61 8.36-.67 16.5-36.82 17.26-64.12.76-27.3-9.12-63.22-21.27-65.38-12.16-2.16-90.03-4.67-130.29-3.95-40.26.72-96.86 4.67-105.98 8.26-9.12 3.59-14.43 35.2-18.23 52.8Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
        <clipPath id='hockey-c'>
          <path
            d='M1110.75 842.24c-1.08-3.24-8.1-18-8.1-18l2.88-.9s2.52-6.66.9-12.6-4.32-15.84-5.04-22.14c-.72-6.3-1.44-10.26-2.88-13.5s-8.46-16.02-8.64-20.34c-.18-4.32 3.78-11.16 3.78-11.16h-3.24s-8.64 11.7-8.1 15.66c.54 3.96 3.6 7.92 3.6 7.92l-17.82-.36s-4.86-13.32-7.92-19.26-6.84-7.74-10.44-7.2c-3.6.54-8.64 3.6-8.64 3.6s12.6 28.62 11.88 37.62c-.72 9-4.68 16.2-10.98 18.72s-15.66 5.76-15.66 5.76l-1.8 5.4s-13.32 2.88-16.74 4.68c-3.42 1.8-3.78 5.22-3.42 8.1.36 2.88 3.78 8.1 3.78 8.1s-6.3 10.44-4.5 16.56c1.8 6.12 9.36 7.74 15.66 8.1 6.3.36 52.21 1.62 61.39 1.8 9.18.18 26.1-1.44 28.8-4.32 2.7-2.88 2.34-9 1.26-12.24Zm-69.67-.54c-.72-1.98 5.76-8.46 5.76-8.46s7.02-1.44 10.8-2.34c3.78-.9 10.98-3.42 10.98-3.42s11.16 7.38 10.26 10.62c-.9 3.24-10.62 4.68-18.18 5.76-7.56 1.08-18.9-.18-19.62-2.16Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
        <clipPath id='hockey-d'>
          <path
            d='M1196.65 849.71c-1.08-3.24-8.1-18-8.1-18l2.88-.9s2.52-6.66.9-12.6-4.32-15.84-5.04-22.14c-.72-6.3-1.44-10.26-2.88-13.5s-8.46-16.02-8.64-20.34c-.18-4.32 3.78-11.16 3.78-11.16h-3.24s-8.64 11.7-8.1 15.66c.54 3.96 3.6 7.92 3.6 7.92l-17.82-.36s-4.86-13.32-7.92-19.26c-3.06-5.94-6.84-7.74-10.44-7.2-3.6.54-8.64 3.6-8.64 3.6s12.6 28.62 11.88 37.62-4.68 16.2-10.98 18.72-15.66 5.76-15.66 5.76l-1.8 5.4s-13.32 2.88-16.74 4.68c-3.42 1.8-3.78 5.22-3.42 8.1.36 2.88 3.78 8.1 3.78 8.1s-6.3 10.44-4.5 16.56c1.8 6.12 9.36 7.74 15.66 8.1 6.3.36 52.21 1.62 61.39 1.8 9.18.18 26.1-1.44 28.8-4.32 2.7-2.88 2.34-9 1.26-12.24Zm-69.67-.54c-.72-1.98 5.76-8.46 5.76-8.46s7.02-1.44 10.8-2.34 10.98-3.42 10.98-3.42 11.16 7.38 10.26 10.62c-.9 3.24-10.62 4.68-18.18 5.76-7.56 1.08-18.9-.18-19.62-2.16Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
        <clipPath id='hockey-e'>
          <path
            d='m1698.84 604.87-7.36-8.26s-338.09 296.97-348.68 306.61-31.41 24.74-63.44 20.88c-32.02-3.86-55.52-16.57-65.58-14.15-10.06 2.42-15.43 17.23-8.81 25.36 6.62 8.12 36.04 12.23 59.92 13.51 22.58 1.21 36.83 2.8 46.14-3.99 9.31-6.79 387.81-339.97 387.81-339.97Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
      </defs>
      <g
        style={{
          clipPath: 'url(#hockey-a)',
        }}
      >
        <path
          style={{
            fill: '#eff1f3',
          }}
          d='m2069.34 1056.77-2185.41 13.1 1.55-1154.62 2185.41-13.09-1.55 1154.61z'
        />
        <path
          id='ENVIRONMENT_BACKGROUND'
          style={{
            fill: '#c1d0da',
          }}
          d='m-208.02 847.7 2409.08-.53-12.38 423.94-2361.32-17.59-35.38-405.82z'
        />
        <path
          style={{
            fill: '#afb1b4',
          }}
          d='m321.86 297.56-12.36 31.72 1.04 33.81 7.35 5.24 6.58-.15 6.54-11.51-6.53-1.94-4.05 7.08-1.38-32.02 9.24-25.51 1.91 8.42 7.17-.14-3.87-14.14-11.64-.86z'
        />
        <path
          d='M316.42 334.23c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66c.04-1.75-.82-2.38-1.91-2.13Zm.55 14.63c-1.75.4-1.86 1.98-1.75 3.06s1.04 1.77 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#516386',
          }}
        />
        <path
          style={{
            fill: '#afb1b4',
          }}
          d='m225.07 297.56-12.37 31.72 1.04 33.81 7.36 5.24 6.58-.15 6.54-11.51-6.54-1.94-4.04 7.08-1.38-32.02 9.24-25.51 1.9 8.42 7.18-.14-3.87-14.14-11.64-.86z'
        />
        <path
          d='M219.63 334.23c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66c.04-1.75-.82-2.38-1.91-2.13Zm.55 14.63c-1.75.4-1.86 1.98-1.75 3.06s1.04 1.77 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#516386',
          }}
        />
        <path
          style={{
            fill: '#afb1b4',
          }}
          d='m418.66 297.56-12.37 31.72 1.04 33.81 7.36 5.24 6.58-.15 6.53-11.51-6.53-1.94-4.04 7.08-1.38-32.02 9.24-25.51 1.9 8.42 7.18-.14-3.87-14.14-11.64-.86z'
        />
        <path
          d='M413.22 334.23c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66-.82-2.38-1.91-2.13Zm.55 14.63c-1.75.4-1.86 1.98-1.75 3.06a1.918 1.918 0 0 0 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#516386',
          }}
        />
        <path
          style={{
            fill: '#d18850',
          }}
          d='m907.76 690.77.88 171.76h19.8l-.88-173.66-19.8 1.9zm-313.98 41.29.88 130.47h19.8l-.88-131.91-19.8 1.44zm660.97-41.29.88 171.76h19.8l-.89-173.66-19.79 1.9zm380 0 .88 171.76h19.8l-.89-173.66-19.79 1.9z'
        />
        <path
          style={{
            fill: '#58b6e3',
          }}
          d='m812.07 169.97 1.98 547 893.34-2.26-2.64-546.34-892.68 1.6z'
        />
        <path
          style={{
            fill: '#339bce',
          }}
          d='m1074.95 183.95 2.67 249.3h113.71l-1.17-248.81-115.21-.49zm125.34.66 2.66 248.32 115.45.98-1.74-249.96-116.37.66zm127.48 0 2.67 249.3h113.7V183.95l-116.37.66zm125.33 0 2.68 249.3h113.7V183.95l-116.38.66zm122.66.59 1.8 246.75h113.7l.87-247.41-116.37.66zm-501.81 258.82 2.68 249.3h113.7l-1.17-248.81-115.21-.49zm125.34.65 2.66 248.32 115.46.98-1.74-249.95-116.38.65zm127.48 0 2.67 249.3h113.71V444.02l-116.38.65zm125.34 0 2.67 249.3h113.7V444.02l-116.37.65zm122.65.59 1.81 246.75h113.7l.87-247.4-116.38.65zM828.07 186.5l2.68 249.31h113.7V185.85l-116.38.65zm122.66.6 1.8 246.74h113.7l.87-247.4-116.37.66zM828.07 446.57l2.68 249.3h113.7V445.92l-116.38.65zm122.66.59 1.8 246.75h113.7l.87-247.4-116.37.65z'
        />
        <path
          style={{
            fill: '#6b5738',
          }}
          d='m557.79 715.78 1415.41-2.82v27.08l-1415.82.79.41-25.05z'
        />
        <path
          d='M1219.65 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1218.72 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1344.98 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1344.05 542.94-.19 11h2.17v-11h-1.98z'
        />
        <path
          d='M1470.31 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1469.37 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1595.64 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          d='m1607.26 560.63-1.14.11c-.16-1.65-.33-3.2-.49-4.21-.76-4.99-3.96-7.67-8.78-7.33-3.9.27-7.92 3.14-7.61 8.79.04.78.22 2.51.43 4.37l-1.71.17 2.35 20.55 19.57-2.24-2.62-20.22Zm-14.98-2.8c-.11-1.94.76-5.31 4.78-5.58 1.19-.08 4.79-.33 5.56 4.75.14.95.31 2.44.47 4.05l-10.38 1.03c-.2-1.83-.38-3.51-.42-4.24Z'
          style={{
            fill: '#e6eef8',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1594.7 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1094.33 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          d='m1099.63 564.52-2.37-.15c0-.07.44-6.84.42-9.26-.04-4.02-2.85-4.22-3.78-4.29-3.14-.23-4.18 2.28-4.31 3.8-.13 1.54-.27 8.49-.27 8.56l-2.38-.05c0-.29.14-7.1.28-8.72.38-4.41 3.81-6.19 6.85-5.97 3.77.27 5.95 2.69 5.99 6.64.02 2.5-.41 9.15-.42 9.43Z'
          style={{
            fill: '#e58b39',
          }}
        />
        <path
          style={{
            fill: '#e58b39',
          }}
          d='m1085.72 558.72-.45 16.16 15.39.42.21-15.94-15.15-.64z'
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1093.39 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M969 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m968.06 542.94-.18 11h2.17v-11h-1.99z'
        />
        <path
          d='M843.67 545.34c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          d='m846.91 568.56-2.04-.37c.01-.06 1.05-5.88 1.27-7.98.36-3.48-2.06-3.94-2.86-4.09-2.7-.51-3.85 1.56-4.11 2.87-.26 1.32-1.07 7.33-1.07 7.39l-2.06-.27c.03-.25.82-6.14 1.1-7.53.76-3.79 3.9-4.99 6.52-4.5 3.24.61 4.89 2.92 4.54 6.34-.23 2.17-1.25 7.89-1.29 8.13Z'
          style={{
            fill: '#eaba00',
          }}
        />
        <path
          style={{
            fill: '#eaba00',
          }}
          d='m835.52 561.37-1.97 13.95 13.29 1.88 1.74-13.79-13.06-2.04z'
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m842.74 548.24-.19 11.01h2.18v-11.01h-1.99z'
        />
        <path
          d='M1218.25 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1219.18 306.41.19 11.01h-2.17v-11.01h1.98z'
        />
        <path
          d='M1092.92 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06s.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1093.86 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M967.6 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          d='m956.44 332.03 3.04.23c0-.09.68-8.75 1.14-11.8.77-5.08 4.38-4.83 5.56-4.75 4.02.27 4.89 3.64 4.78 5.58-.11 1.97-1.19 10.81-1.2 10.9l3.02.37c.05-.37 1.1-9.02 1.22-11.09.32-5.66-3.71-8.52-7.61-8.79-4.83-.33-8.03 2.34-8.78 7.33-.48 3.17-1.14 11.67-1.16 12.03Z'
          style={{
            fill: '#b3993e',
          }}
        />
        <path
          style={{
            fill: '#b3993e',
          }}
          d='m975.28 326.01-2.35 20.55-19.57-2.24 2.61-20.22 19.31 1.91z'
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m968.53 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M842.27 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m843.2 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1343.58 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          d='m1340.8 331.75 2.88-.99c-.03-.08-2.85-8.3-3.63-11.29-1.31-4.97 2.1-6.17 3.22-6.57 3.8-1.34 5.93 1.4 6.6 3.23.68 1.86 3.19 10.39 3.22 10.48l2.92-.86c-.1-.36-2.57-8.72-3.28-10.67-1.95-5.32-6.78-6.35-10.47-5.05-4.56 1.61-6.44 5.33-5.16 10.21.82 3.1 3.58 11.16 3.7 11.5Z'
          style={{
            fill: '#d18850',
          }}
        />
        <path
          style={{
            fill: '#d18850',
          }}
          d='m1355.7 318.75 6 19.79-18.86 5.71-5.62-19.6 18.48-5.9z'
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1344.51 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1468.9 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1469.84 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1594.23 308.82c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#005c9d',
          }}
        />
        <path
          style={{
            fill: '#b1c4d0',
          }}
          d='m1595.17 311.71.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1595.33 710.75s-43.68 54.96-50.52 72.92c-6.84 17.96-17.47 103.45-17.47 103.45l16.71.36s14.81-97.7 20.13-108.48c5.32-10.78 31.35-58.49 31.35-58.49l39.43-.92s22.28 48.27 26.84 57.97c4.56 9.7 22.03 110.28 22.03 110.28l16.71.36s-15.57-105.97-21.65-113.87c-6.08-7.9-44.21-64.59-44.21-64.59l-39.36 1.01Z'
          style={{
            fill: '#009250',
          }}
        />
        <path
          d='M1490.87 814.56c-7.23 33.48 4.59 72.91 17.85 74 15.37 1.26 231.32-.87 240.66-1.61 8.36-.67 16.5-36.82 17.26-64.12.76-27.3-9.12-63.22-21.27-65.38-12.16-2.16-90.03-4.67-130.29-3.95-40.26.72-96.86 4.67-105.98 8.26-9.12 3.59-14.43 35.2-18.23 52.8Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <g
          style={{
            clipPath: 'url(#hockey-b)',
          }}
        >
          <path
            d='M1531.25 754.15s-2.79 7.91-3.34 13.7c-.56 5.8 1.11 14.23 18.39 13.7 17.28-.53 137.66-.98 151.87-.98 14.21 0 18.27-5.76 15.23-16.32-3.05-10.56-9.14-29.76-9.14-29.76l-173.01 19.65Z'
            style={{
              fill: '#fbf8f6',
            }}
          />
          <path
            d='M1538.81 749.65s-3.34 13.62-3.85 17.47c-.51 3.85 1.02 9.46 16.87 9.11 15.85-.35 128.19-1.23 141.23-1.23 13.04 0 17.37-3.21 14.58-10.23-2.79-7.02-5.17-22.68-5.17-22.68l-163.66 7.56Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </g>
        <path
          style={{
            fill: '#e95b27',
          }}
          d='M1593.76 710.4v11.03l41.56 1.31-1.43-13-40.13.66z'
        />
        <path
          d='M1602.89 712.5s-44.41 55.36-51.25 73.33c-6.84 17.96-18.87 104.81-18.87 104.81l18.11-1s14.81-97.7 20.13-108.48c5.32-10.78 31.53-56.75 31.53-56.75l39.12-.36s22.41 45.98 26.97 55.68c4.56 9.7 22.14 108.87 22.14 108.87l17.91.13s-16.88-104.32-22.95-112.23c-6.08-7.9-45.49-63.72-45.49-63.72l-37.35-.26Z'
          style={{
            fill: '#009250',
          }}
        />
        <path
          style={{
            fill: '#e95b27',
          }}
          d='m1602.09 712.24-.55 12.47 38.74-.79-.28-11.42-37.91-.26z'
        />
        <path
          d='m801.33 655.85 27.41 16.87-15.91 32.31s-18.75-8.8-20.77-12.48-5.93-16.64-5.93-16.64l15.19-20.06Zm-.39 21.12-3.81 3.81 2.39 7.34 8.04 2.52 3.55-5.95-10.17-7.72Z'
          style={{
            fill: '#f29e97',
          }}
        />
        <path
          d='M774.08 703.01s-4.29 4.35-8.56 7.04-9.55 5.46-9.55 5.46l5.11 8.05s2.43-1.69 8.35-6.27 10.6-8.83 10.6-8.83l-5.95-5.45Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <path
          d='M846.84 638.74c-8.64-9.1-32.1-18.59-48.09-20.21-4.5-.45-12.03 2.57-18.59 8.98-6.57 6.41-11.48 12.83-11.48 12.83s11.73 8.37 14.58 11.11 4.75 4.64 1.7 8.4c-3.06 3.76-5.61 7.49-6.89 9.22s-2.94 3.62 1.39 7.66 7.15 4.36 9.44 2.55 10.29-7.91 11.86-8.91c3.78-2.41 6.63.33 11.62 4.7s7.78 5.28 5.81 9.15c-2.48 4.88-9.61 19.95-9.61 19.95l7.16 14.14 8.62 5.4s21.61-9.43 25.78-13.64 13.64-21.47 11.36-39.63c-1.34-10.71-2.52-18.89-14.67-31.69Z'
          style={{
            fill: '#e52d87',
          }}
        />
        <path
          d='m778.37 689.13-35.27-1.1-3.04 9.73s12 12.42 20.84 17.3c8.84 4.88 27.02 6.99 27.02 6.99l1.66-7.61s-26.14-5.26-28.22-5.89-13.59-13.33-13.59-13.33l30.09-.33.51-5.75Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <path
          d='M780.27 671.72s-3.85 3.3-8.22 10.2c-4.37 6.9-6.82 10.23-6.82 10.23l10.43 21.29s28.47 3.97 30.86 3.68 11.9-6.5 11.9-6.5l-4.26-8.74s-9.03 5.68-10.51 6.28-19.6-.49-19.6-.49l-10.03-15.22s3.6-5.19 6.92-8.72 6.43-6.52 6.43-6.52l-7.1-5.5Z'
          style={{
            fill: '#e52d87',
          }}
        />
        <path
          d='M1110.75 842.24c-1.08-3.24-8.1-18-8.1-18l2.88-.9s2.52-6.66.9-12.6-4.32-15.84-5.04-22.14c-.72-6.3-1.44-10.26-2.88-13.5s-8.46-16.02-8.64-20.34c-.18-4.32 3.78-11.16 3.78-11.16h-3.24s-8.64 11.7-8.1 15.66c.54 3.96 3.6 7.92 3.6 7.92l-17.82-.36s-4.86-13.32-7.92-19.26-6.84-7.74-10.44-7.2c-3.6.54-8.64 3.6-8.64 3.6s12.6 28.62 11.88 37.62c-.72 9-4.68 16.2-10.98 18.72s-15.66 5.76-15.66 5.76l-1.8 5.4s-13.32 2.88-16.74 4.68c-3.42 1.8-3.78 5.22-3.42 8.1.36 2.88 3.78 8.1 3.78 8.1s-6.3 10.44-4.5 16.56c1.8 6.12 9.36 7.74 15.66 8.1 6.3.36 52.21 1.62 61.39 1.8 9.18.18 26.1-1.44 28.8-4.32 2.7-2.88 2.34-9 1.26-12.24Zm-69.67-.54c-.72-1.98 5.76-8.46 5.76-8.46s7.02-1.44 10.8-2.34c3.78-.9 10.98-3.42 10.98-3.42s11.16 7.38 10.26 10.62c-.9 3.24-10.62 4.68-18.18 5.76-7.56 1.08-18.9-.18-19.62-2.16Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <g
          style={{
            clipPath: 'url(#hockey-c)',
          }}
        >
          <path
            d='M997.34 827.3s14.58 3.42 34.38 4.14c19.8.72 31.14-4.14 39.78-4.68s36.54-2.7 36.54-2.7l18.9 37.8-103.15 35.28-39.24-51.13s12.96-18.72 12.78-18.72Z'
            style={{
              fill: '#fbf8f6',
            }}
          />
          <path
            d='M1038.56 749.53s8.1-5.94 12.42-2.88 10.8 22.68 10.8 22.68-3.96-1.08-3.96 3.96 1.98 13.5-2.16 19.08-17.82 7.2-17.82 7.2l.72-50.05Z'
            style={{
              fill: '#ffd500',
            }}
          />
          <path
            d='M994.82 841.88s19.8 9 31.14 9.54 59.95 1.26 65.89.54c5.94-.72 23.04-7.2 23.04-7.2l.9 25.92-134.3-10.98 13.32-17.82Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </g>
        <path
          d='m1035.14 802.27 2.88 8.1 1.8-.72.18-7.2 4.5 5.58 1.8-.9-1.98-8.1 6.12 5.4 1.44-1.26-3.78-6.48.9-1.08 6.84 5.04 1.26-1.44-6.12-6.12 1.62-1.08 8.82 2.7.9-1.62-4.5-4.14 6.84.54v-1.8l-12.96-3.6s.18 5.4-3.6 9.36-4.32 6.12-7.2 7.2-5.76 1.62-5.76 1.62Zm-6.84 1.62 1.26 7.56 2.7-.72-.54-7.2-3.42.36z'
          style={{
            fill: '#fbf8f6',
          }}
        />
        <path
          d='M1196.65 849.71c-1.08-3.24-8.1-18-8.1-18l2.88-.9s2.52-6.66.9-12.6-4.32-15.84-5.04-22.14c-.72-6.3-1.44-10.26-2.88-13.5s-8.46-16.02-8.64-20.34c-.18-4.32 3.78-11.16 3.78-11.16h-3.24s-8.64 11.7-8.1 15.66c.54 3.96 3.6 7.92 3.6 7.92l-17.82-.36s-4.86-13.32-7.92-19.26c-3.06-5.94-6.84-7.74-10.44-7.2-3.6.54-8.64 3.6-8.64 3.6s12.6 28.62 11.88 37.62-4.68 16.2-10.98 18.72-15.66 5.76-15.66 5.76l-1.8 5.4s-13.32 2.88-16.74 4.68c-3.42 1.8-3.78 5.22-3.42 8.1.36 2.88 3.78 8.1 3.78 8.1s-6.3 10.44-4.5 16.56c1.8 6.12 9.36 7.74 15.66 8.1 6.3.36 52.21 1.62 61.39 1.8 9.18.18 26.1-1.44 28.8-4.32 2.7-2.88 2.34-9 1.26-12.24Zm-69.67-.54c-.72-1.98 5.76-8.46 5.76-8.46s7.02-1.44 10.8-2.34 10.98-3.42 10.98-3.42 11.16 7.38 10.26 10.62c-.9 3.24-10.62 4.68-18.18 5.76-7.56 1.08-18.9-.18-19.62-2.16Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <g
          style={{
            clipPath: 'url(#hockey-d)',
          }}
        >
          <path
            d='M1083.23 834.77s14.58 3.42 34.38 4.14c19.8.72 31.14-4.14 39.78-4.68s36.54-2.7 36.54-2.7l18.9 37.8-103.15 35.28-39.24-51.13s12.96-18.72 12.78-18.72Z'
            style={{
              fill: '#fbf8f6',
            }}
          />
          <path
            d='M1124.46 757s8.1-5.94 12.42-2.88 10.8 22.68 10.8 22.68-3.96-1.08-3.96 3.96 1.98 13.5-2.16 19.08-17.82 7.2-17.82 7.2l.72-50.05Z'
            style={{
              fill: '#ffd500',
            }}
          />
          <path
            d='M1080.71 849.35s19.8 9 31.14 9.54c11.34.54 59.95 1.26 65.89.54 5.94-.72 23.04-7.2 23.04-7.2l.9 25.92-134.3-10.98 13.32-17.82Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </g>
        <path
          d='m1121.04 809.75 2.88 8.1 1.8-.72.18-7.2 4.5 5.58 1.8-.9-1.98-8.1 6.12 5.4 1.44-1.26-3.78-6.48.9-1.08 6.84 5.04 1.26-1.44-6.12-6.12 1.62-1.08 8.82 2.7.9-1.62-4.5-4.14 6.84.54v-1.8l-12.96-3.6s.18 5.4-3.6 9.36-4.32 6.12-7.2 7.2-5.76 1.62-5.76 1.62Zm-6.84 1.62 1.26 7.56 2.7-.72-.54-7.2-3.42.36z'
          style={{
            fill: '#fbf8f6',
          }}
        />
        <path
          d='m1698.84 604.87-7.36-8.26s-338.09 296.97-348.68 306.61-31.41 24.74-63.44 20.88c-32.02-3.86-55.52-16.57-65.58-14.15-10.06 2.42-15.43 17.23-8.81 25.36 6.62 8.12 36.04 12.23 59.92 13.51 22.58 1.21 36.83 2.8 46.14-3.99 9.31-6.79 387.81-339.97 387.81-339.97Z'
          style={{
            fill: '#272a3e',
          }}
        />
        <g
          style={{
            clipPath: 'url(#hockey-e)',
          }}
        >
          <path
            style={{
              fill: '#db1f81',
            }}
            d='m1365.41 838.72 62.79 122.4-168.3 96.94-131.72-145.68 237.23-73.66z'
          />
          <path
            style={{
              fill: '#009634',
            }}
            d='m1344.04 836.58 62.79 122.4-168.3 96.94-131.72-145.68 237.23-73.66z'
          />
          <path
            style={{
              fill: '#fee608',
            }}
            d='m1299.95 860.4 62.79 122.39-168.3 96.94-131.72-145.68 237.23-73.65z'
          />
        </g>
      </g>
    </svg>
  )
}

export default Hockey
