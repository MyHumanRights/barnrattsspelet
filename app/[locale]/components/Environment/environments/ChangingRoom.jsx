import { useTranslations } from 'next-intl'

const ChangingRoom = (props) => {
  const t = useTranslations()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='changingroom-title'
      xmlSpace='preserve'
      {...props}
    >
      <title id='changingroom-title'>
        {t('antagonists.gymteacher.components.background')}
      </title>
      <defs>
        <clipPath id='changingroom-b'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h1920v1080H0z'
          />
        </clipPath>
        <clipPath id='changingroom-c'>
          <path
            d='M1085.4 803.69c-1.8.42-7.54 16.41-10.1 23.81-3.79 10.95-6.69 21.57-5.94 24.79.76 3.22 21.93 4.33 30.89 3.73 8.96-.6 22.2-2.86 31.14-1.73s20.07 1.29 28.44.19c8.36-1.11 16.5-6.32 18.52-9.5 2.02-3.18-.5-7.6-3.27-8.88-2.77-1.28-15.91-3.32-21.45-6.37-5.53-3.05-21.76-15.55-24.75-19.68s-7.26-12.24-11.41-6.04c-4.89 7.31-3.93 17.48-14.47 17.18-7.01-.19-9.86-2.82-9.41-8.03.35-4.15-2.76-10.74-8.19-9.47Z'
            style={{
              fill: '#f1f1f3',
            }}
          />
        </clipPath>
        <clipPath id='changingroom-d'>
          <path
            d='M1000.83 804.98c-1.8.42-7.54 16.41-10.1 23.81-3.79 10.95-6.69 21.57-5.94 24.79s21.93 4.33 30.89 3.73c8.96-.6 22.2-2.86 31.14-1.73 8.94 1.12 20.07 1.29 28.44.19 8.36-1.11 16.5-6.32 18.52-9.5 2.02-3.18-.5-7.6-3.27-8.88-2.77-1.28-15.91-3.32-21.45-6.37-5.53-3.05-21.76-15.55-24.75-19.68s-7.26-12.24-11.41-6.04c-4.89 7.31-4.49 17.3-15.03 17.01-7.01-.19-9.29-2.64-8.85-7.86.35-4.15-2.76-10.74-8.19-9.47Z'
            style={{
              fill: '#f1f1f3',
            }}
          />
        </clipPath>
        <clipPath id='changingroom-e'>
          <path
            d='M1340.45 803.67c-5.59 25.92 3.55 56.44 13.82 57.28 11.9.98 179.07-.67 186.3-1.25 6.47-.52 12.77-28.5 13.36-49.64s-7.06-48.94-16.47-50.61c-9.41-1.67-69.69-3.61-100.86-3.06-31.17.56-74.98 3.61-82.04 6.4-7.06 2.78-11.17 27.25-14.11 40.88Z'
            style={{
              fill: '#008f33',
            }}
          />
        </clipPath>
        <clipPath id='changingroom-f'>
          <path
            d='M1306.05 593.74c-1.5-6.17-8.76-9.36-16.1-7.55-7.34 1.81-10.87 6.05-11.18 12.78-.3 6.73-.47 20.08-5.64 33.32-7.9 20.22-21.45 29.4-22.3 31.14-1.1 2.26-2.17 5.17-2.17 5.17l-302.82 35.77 1.07 10.63 303.57-36.74s5.3 2.6 8.75 1.95c5.59-1.05 33.85-5.98 44.04-39.85 8.61-28.62 4.24-40.58 2.77-46.64Zm-1.73 20.6-2.43-1.58c-.01 3.52-.28 7.47-1.02 11.6l3.48 2.26-1.01 1.56-2.86-1.85c-.68 3.17-1.64 6.42-2.99 9.63-.04.11-.09.21-.14.31l4.13 2.72-1.02 1.56-3.87-2.55c-1.36 2.98-2.94 5.94-4.63 8.8l4.92 3.22-1.02 1.56-4.86-3.18c-1.84 3.02-3.77 5.91-5.65 8.55l4.53 3.02-1.03 1.55-4.58-3.06c-2.09 2.87-4.06 5.41-5.72 7.46l2.5 1.67-1.03 1.55-2.65-1.77c-2.07 2.51-3.42 4-3.47 4.06l-1.38-1.26s1.32-1.46 3.29-3.84l-3.94-2.63c-3.73 4.53-6.44 7.44-6.52 7.51l-1.36-1.28c.07-.07 2.69-2.88 6.32-7.27l-3.31-2.21c-2.13 2.43-3.55 3.81-3.59 3.85l-1.29-1.35s1.34-1.3 3.32-3.54l-4.02-2.68 1.03-1.55 4.21 2.81c1.68-1.98 3.68-4.5 5.74-7.46l-2.93-1.96 1.03-1.55 2.95 1.97c1.76-2.63 3.54-5.55 5.17-8.72l-4.84-3.17 1.02-1.56 4.66 3.05c.94-1.92 1.81-3.91 2.6-5.98.43-1.14.83-2.27 1.18-3.41l-5.29-3.47 1.02-1.56 4.82 3.17c1.03-3.63 1.69-7.17 2.11-10.49l-3.48-2.26 1.01-1.56 2.7 1.75c.47-4.75.44-8.94.27-12.15l-3.7-2.41 1.02-1.56 2.51 1.64c-.22-2.59-.5-4.12-.51-4.17l1.83-.35c.01.06.41 2.23.64 5.8l4.79 3.12c-.29-5.85-.93-9.98-.94-10.07l1.84-.3c.07.43.81 5.16 1.05 11.64l4.97 3.24c-.26-6.06-1.18-10.16-1.2-10.24l1.82-.42c.09.39 1.15 5.13 1.33 11.93l3.47 2.26-1.02 1.56Z'
            style={{
              fill: '#2e425b',
            }}
          />
        </clipPath>
        <style>
          {
            '.h{fill:none}.i{fill:#f3fafd}.j{fill:#f8f8f8}.k{fill:#008f33}.l{fill:#007bc2}.m{fill:#ffe558}.n{fill:#f1f1f3}.o{fill:#ffd800}.p{fill:#e52d87}.q{fill:#eef6eb}.r{fill:#e5b224}.s{fill:#93a090}.t{fill:#b3993e}.u{fill:#b0983a}.v{fill:#c6d6dc}.w{fill:#df2e87}.x{fill:#0b8f8a}.y{fill:#189686}.aa{fill:#2a5151}.ab{fill:#2e425b}.ac{fill:#272a3e}.ad{fill:#50b492}.ae{fill:#7c5198}.af{clip-path:url(#changingroom-c)}.ag{clip-path:url(#changingroom-b)}.ah{clip-path:url(#changingroom-f)}.ai{clip-path:url(#changingroom-e)}.aj{clip-path:url(#changingroom-d)}'
          }
        </style>
      </defs>
      <g
        style={{
          clipPath: 'url(#changingroom-b)',
        }}
        id='changingroom-a'
      >
        <path
          style={{
            fill: '#c6d6dc',
          }}
          d='m2067.06 1061.34-2185.41 13.09 1.55-1154.61 2185.41-13.09-1.55 1154.61z'
        />
        <path
          id='ENVIRONMENT_BACKGROUND'
          style={{
            fill: '#f3fafd',
          }}
          d='m-208.02 847.7 2409.08-.53-12.38 423.94-2361.32-17.59-35.38-405.82z'
        />
        <path
          style={{
            fill: '#f8f8f8',
          }}
          d='m238.85 249.73-12.37 31.71 1.04 33.81 7.36 5.25 6.58-.15 6.54-11.52-6.54-1.94-4.04 7.09-1.38-32.03 9.24-25.5 1.9 8.41 7.18-.14-3.87-14.14-11.64-.85z'
        />
        <path
          d='M233.41 286.4c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66c.04-1.75-.82-2.38-1.91-2.13ZM233.96 301.03c-1.75.4-1.86 1.98-1.75 3.06s1.04 1.77 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#879384',
          }}
        />
        <path
          style={{
            fill: '#f8f8f8',
          }}
          d='m142.06 249.73-12.37 31.71 1.04 33.81 7.36 5.25 6.58-.15 6.53-11.52-6.53-1.94-4.05 7.09-1.38-32.03 9.24-25.5 1.91 8.41 7.18-.14-3.87-14.14-11.64-.85z'
        />
        <path
          d='M136.62 286.4c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66c.04-1.75-.82-2.38-1.91-2.13ZM137.17 301.03c-1.75.4-1.86 1.98-1.75 3.06s1.04 1.77 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#879384',
          }}
        />
        <path
          style={{
            fill: '#f8f8f8',
          }}
          d='m335.64 249.73-12.36 31.71 1.04 33.81 7.36 5.25 6.58-.15 6.53-11.52-6.53-1.94-4.05 7.09-1.38-32.03 9.24-25.5 1.91 8.41 7.18-.14-3.87-14.14-11.65-.85z'
        />
        <path
          d='M330.2 286.4c-1.75.4-1.86 1.98-1.75 3.06.11 1.08 1.04 1.77 1.98 1.73s1.64-.91 1.68-2.66-.82-2.38-1.91-2.13ZM330.75 301.03c-1.75.4-1.86 1.98-1.75 3.06a1.918 1.918 0 0 0 1.98 1.73c.94-.05 1.64-.91 1.68-2.66.04-1.75-.82-2.38-1.91-2.13Z'
          style={{
            fill: '#879384',
          }}
        />
        <path
          style={{
            fill: '#2e425b',
          }}
          d='m907.76 690.77.88 171.76h19.8l-.88-173.66-19.8 1.9zM593.78 732.06l.88 130.47h19.8l-.88-131.91-19.8 1.44zM1254.75 690.77l.88 171.76h19.8l-.89-173.66-19.79 1.9zM1634.75 690.77l.88 171.76h19.8l-.89-173.66-19.79 1.9z'
        />
        <path
          style={{
            fill: '#e5b224',
          }}
          d='m812.07 169.97 1.98 547 893.34-2.26-2.64-546.34-892.68 1.6z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m1074.95 183.95 2.67 249.3h113.71l-1.17-248.81-115.21-.49z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m1200.29 184.61 2.66 248.32 115.45.98-1.74-249.96-116.37.66z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m1327.77 184.61 2.67 249.3h113.7V183.95l-116.37.66zM1453.1 184.61l2.68 249.3h113.7V183.95l-116.38.66z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m1575.76 185.2 1.8 246.75h113.7l.87-247.41-116.37.66z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m1073.95 444.02 2.68 249.3h113.7l-1.17-248.81-115.21-.49zM1199.29 444.67l2.66 248.32 115.46.98-1.74-249.95-116.38.65z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m1326.77 444.67 2.67 249.3h113.71V444.02l-116.38.65z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m1452.11 444.67 2.67 249.3h113.7V444.02l-116.37.65z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m1574.76 445.26 1.81 246.75h113.7l.87-247.4-116.38.65z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m828.07 186.5 2.68 249.31h113.7V185.85l-116.38.65z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m950.73 187.1 1.8 246.74h113.7l.87-247.4-116.37.66z'
        />
        <path
          style={{
            fill: '#ffd800',
          }}
          d='m828.07 446.57 2.68 249.3h113.7V445.92l-116.38.65z'
        />
        <path
          style={{
            fill: '#ffe558',
          }}
          d='m950.73 447.16 1.8 246.75h113.7l.87-247.4-116.37.65z'
        />
        <path
          style={{
            fill: '#b0983a',
          }}
          d='m557.79 715.78 1415.41-2.82v27.08l-1415.82.79.41-25.05z'
        />
        <path
          d='M1219.65 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1218.72 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1344.98 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1344.05 542.94-.19 11h2.17v-11h-1.98z'
        />
        <path
          d='M1470.31 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1469.37 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1595.64 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          d='m1606.79 568.56-3.04.23c0-.09-.68-8.75-1.14-11.8-.77-5.08-4.38-4.83-5.56-4.75-4.02.27-4.89 3.64-4.78 5.58.11 1.97 1.19 10.81 1.2 10.9l-3.02.37c-.05-.37-1.1-9.02-1.22-11.09-.32-5.66 3.71-8.52 7.61-8.79 4.83-.33 8.03 2.34 8.78 7.33.48 3.17 1.14 11.67 1.16 12.03Z'
          style={{
            fill: '#7c5198',
          }}
        />
        <path
          style={{
            fill: '#7c5198',
          }}
          d='m1587.95 562.54 2.35 20.55 19.58-2.24-2.62-20.22-19.31 1.91z'
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1594.7 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M1094.33 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          d='m1099.63 564.52-2.37-.15c0-.07.44-6.84.42-9.26-.04-4.02-2.85-4.22-3.78-4.29-3.14-.23-4.18 2.28-4.31 3.8-.13 1.54-.27 8.49-.27 8.56l-2.38-.05c0-.29.14-7.1.28-8.72.38-4.41 3.81-6.19 6.85-5.97 3.77.27 5.95 2.69 5.99 6.64.02 2.5-.41 9.15-.42 9.43Z'
          style={{
            fill: '#df2e87',
          }}
        />
        <path
          style={{
            fill: '#df2e87',
          }}
          d='m1085.72 558.72-.45 16.16 15.39.42.21-15.94-15.15-.64z'
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1093.39 542.94-.19 11h2.18v-11h-1.99z'
        />
        <path
          d='M969 540.04c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m968.06 542.94-.18 11h2.17v-11h-1.99z'
        />
        <path
          d='M843.67 545.34c-4.44.16-5.59 1.76-5.59 7.78 0 6.38.3 9.24 5.59 9.12 5.91-.14 5.83-3.76 5.83-9.06s-.79-8.02-5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          d='m846.91 568.56-2.04-.37c.01-.06 1.05-5.88 1.27-7.98.36-3.48-2.06-3.94-2.86-4.09-2.7-.51-3.85 1.56-4.11 2.87-.26 1.32-1.07 7.33-1.07 7.39l-2.06-.27c.03-.25.82-6.14 1.1-7.53.76-3.79 3.9-4.99 6.52-4.5 3.24.61 4.89 2.92 4.54 6.34-.23 2.17-1.25 7.89-1.29 8.13Z'
          style={{
            fill: '#2a5151',
          }}
        />
        <path
          style={{
            fill: '#2a5151',
          }}
          d='m835.52 561.37-1.97 13.95 13.29 1.88 1.74-13.79-13.06-2.04z'
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m842.74 548.24-.19 11.01h2.18v-11.01h-1.99z'
        />
        <path
          d='M1218.25 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1219.18 306.41.19 11.01h-2.17v-11.01h1.98z'
        />
        <path
          d='M1092.92 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06s.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1093.86 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M967.6 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
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
            fill: '#eef6eb',
          }}
          d='m968.53 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M842.27 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m843.2 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1343.58 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          d='m1340.8 331.75 2.88-.99c-.03-.08-2.85-8.3-3.63-11.29-1.31-4.97 2.1-6.17 3.22-6.57 3.8-1.34 5.93 1.4 6.6 3.23.68 1.86 3.19 10.39 3.22 10.48l2.92-.86c-.1-.36-2.57-8.72-3.28-10.67-1.95-5.32-6.78-6.35-10.47-5.05-4.56 1.61-6.44 5.33-5.16 10.21.82 3.1 3.58 11.16 3.7 11.5Z'
          style={{
            fill: '#0b8f8a',
          }}
        />
        <path
          style={{
            fill: '#0b8f8a',
          }}
          d='m1355.7 318.75 6 19.79-18.86 5.71-5.62-19.6 18.48-5.9z'
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1344.51 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1468.9 303.51c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1469.84 306.41.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1594.23 308.82c4.44.16 5.59 1.76 5.59 7.78 0 6.38-.3 9.24-5.59 9.12-5.91-.14-5.83-3.76-5.83-9.06 0-5.26.79-8.02 5.83-7.84Z'
          style={{
            fill: '#93a090',
          }}
        />
        <path
          style={{
            fill: '#eef6eb',
          }}
          d='m1595.17 311.71.19 11.01h-2.18v-11.01h1.99z'
        />
        <path
          d='M1085.4 803.69c-1.8.42-7.54 16.41-10.1 23.81-3.79 10.95-6.69 21.57-5.94 24.79.76 3.22 21.93 4.33 30.89 3.73 8.96-.6 22.2-2.86 31.14-1.73s20.07 1.29 28.44.19c8.36-1.11 16.5-6.32 18.52-9.5 2.02-3.18-.5-7.6-3.27-8.88-2.77-1.28-15.91-3.32-21.45-6.37-5.53-3.05-21.76-15.55-24.75-19.68s-7.26-12.24-11.41-6.04c-4.89 7.31-3.93 17.48-14.47 17.18-7.01-.19-9.86-2.82-9.41-8.03.35-4.15-2.76-10.74-8.19-9.47Z'
          style={{
            fill: '#f1f1f3',
          }}
        />
        <g
          style={{
            clipPath: 'url(#changingroom-c)',
          }}
        >
          <path
            d='M784.55 848.68s2.51-12.06-1.76-28.03-10.2-14.56-10.2-14.56l-21.63 31.94 18.22 9.98 15.37.67Z'
            style={{
              fill: 'none',
            }}
          />
          <path
            d='M1065.71 833.76s14.29 7.31 30.56 7.56c6.97.11 23.02-1.34 33.71.76 10.69 2.1 26.22 5.38 34.77 4.72 15.31-1.19 20.52-14.08 20.52-14.08l6.58-3.92-9.35 30.78-117.57 9.99.79-35.81Z'
            style={{
              fill: '#007bc2',
            }}
          />
        </g>
        <path
          d='M1000.83 804.98c-1.8.42-7.54 16.41-10.1 23.81-3.79 10.95-6.69 21.57-5.94 24.79s21.93 4.33 30.89 3.73c8.96-.6 22.2-2.86 31.14-1.73 8.94 1.12 20.07 1.29 28.44.19 8.36-1.11 16.5-6.32 18.52-9.5 2.02-3.18-.5-7.6-3.27-8.88-2.77-1.28-15.91-3.32-21.45-6.37-5.53-3.05-21.76-15.55-24.75-19.68s-7.26-12.24-11.41-6.04c-4.89 7.31-4.49 17.3-15.03 17.01-7.01-.19-9.29-2.64-8.85-7.86.35-4.15-2.76-10.74-8.19-9.47Z'
          style={{
            fill: '#f1f1f3',
          }}
        />
        <g
          style={{
            clipPath: 'url(#changingroom-d)',
          }}
        >
          <path
            d='M1008.01 847.69s2.7-12.95-1.89-30.1c-4.59-17.15-10.96-15.64-10.96-15.64l-23.24 34.31 19.57 10.72 16.51.71Z'
            style={{
              fill: 'none',
            }}
          />
          <path
            d='M981.14 835.05s14.29 7.31 30.56 7.56c6.97.11 23.02-1.34 33.71.76 10.69 2.1 26.22 5.38 34.77 4.72 15.31-1.19 20.52-14.08 20.52-14.08l6.58-3.92-9.35 30.78-117.57 9.99.79-35.81Z'
            style={{
              fill: '#007bc2',
            }}
          />
        </g>
        <path
          d='M1268.3 696.94c-.11 9.38-7.34 18.07-18.03 17.71-10.3-.35-16.97-8.2-17.15-17.71-.18-9.49 7.55-17.82 17.81-17.64 9.94.18 17.46 8.75 17.36 17.64Zm-27.34-10.46c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm21.76.72a2.47 2.47 0 0 0-2.53 2.5c.02 1.35.97 2.46 2.43 2.51 1.52.05 2.54-1.18 2.56-2.51.01-1.26-1.05-2.48-2.46-2.5Zm-16.23 12.98c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm-9.73-1.84c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm13.79-8.47c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm11.14 8.88c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm-7.53 8.81c-1.46-.03-2.55 1.16-2.53 2.5s.97 2.46 2.43 2.51 2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Zm-3.52-26.96a2.47 2.47 0 0 0-2.53 2.5c.02 1.35.97 2.46 2.43 2.51s2.54-1.18 2.56-2.51c.01-1.26-1.05-2.48-2.46-2.5Z'
          style={{
            fill: '#f1f1f3',
          }}
        />
        <path
          d='M1421.32 723.31s-33.82 42.54-39.11 56.45c-5.29 13.9-13.53 80.08-13.53 80.08l12.94.28s11.47-75.63 15.58-83.98c4.12-8.34 24.27-45.28 24.27-45.28l30.53-.71s17.25 37.37 20.77 44.88c3.53 7.51 17.06 85.37 17.06 85.37l12.94.28s-12.06-82.03-16.76-88.15c-4.7-6.12-34.22-50-34.22-50l-30.47.78Z'
          style={{
            fill: '#189686',
          }}
        />
        <path
          d='M1340.45 803.67c-5.59 25.92 3.55 56.44 13.82 57.28 11.9.98 179.07-.67 186.3-1.25 6.47-.52 12.77-28.5 13.36-49.64s-7.06-48.94-16.47-50.61c-9.41-1.67-69.69-3.61-100.86-3.06-31.17.56-74.98 3.61-82.04 6.4-7.06 2.78-11.17 27.25-14.11 40.88Z'
          style={{
            fill: '#008f33',
          }}
        />
        <g
          style={{
            clipPath: 'url(#changingroom-e)',
          }}
        >
          <path
            d='M1331.34 789.49s63.22 1.67 94.98 1.95c31.76.28 110.27-1.95 110.27-1.95l.29 13.63s-67.93 1.39-113.21 1.39-77.63-.28-77.63-.28l-16.17-4.45s1.18-9.18 1.47-10.29ZM1371.71 756.9s-2.16 6.12-2.59 10.61c-.43 4.49.86 11.02 14.24 10.61 13.37-.41 106.56-.76 117.57-.76s14.14-4.46 11.79-12.63c-2.36-8.17-7.07-23.04-7.07-23.04l-133.93 15.21Z'
            style={{
              fill: '#50b492',
            }}
          />
          <path
            d='M1377.56 753.42s-2.58 10.54-2.98 13.52c-.4 2.98.79 7.32 13.06 7.05 12.27-.27 99.23-.95 109.33-.95s13.45-2.48 11.29-7.92c-2.16-5.43-4-17.56-4-17.56l-126.69 5.85Z'
            style={{
              fill: '#008f33',
            }}
          />
        </g>
        <path
          style={{
            fill: '#272a3e',
          }}
          d='M1420.94 723.03v8.54l32.17 1.02-1.11-10.06-31.06.5z'
        />
        <path
          d='M1427.17 724.66s-34.38 42.86-39.67 56.76c-5.29 13.9-14.61 81.14-14.61 81.14l14.02-.78s11.47-75.63 15.58-83.98c4.12-8.34 24.41-43.93 24.41-43.93l30.29-.28s17.35 35.59 20.88 43.1c3.53 7.51 17.14 84.28 17.14 84.28l13.86.1s-13.06-80.76-17.77-86.88c-4.7-6.12-35.21-49.33-35.21-49.33l-28.91-.2Z'
          style={{
            fill: '#50b492',
          }}
        />
        <path
          style={{
            fill: '#272a3e',
          }}
          d='m1427.39 724.46-.43 9.65 29.99-.61-.22-8.84-29.34-.2z'
        />
        <path
          d='m1289.4 633.28-4.54-2.98c-.32 1-.67 2-1.05 3.01-.83 2.19-1.77 4.31-2.77 6.34l3.86 2.52c1.72-2.95 3.27-5.95 4.51-8.89ZM1273.94 651.58c-2.05 2.94-4.04 5.46-5.73 7.46l3.28 2.19c1.79-2.2 3.75-4.72 5.74-7.45l-3.29-2.2ZM1273.05 662.27l3.95 2.63c1.65-2.04 3.63-4.58 5.73-7.46l-3.94-2.63c-1.99 2.73-3.95 5.24-5.74 7.46ZM1292.48 621.14l-4.83-3.13c-.46 3.32-1.16 6.84-2.21 10.44l4.66 3.06c1.16-3.24 1.92-6.79 2.38-10.37ZM1293.1 607.02l-4.76-3.1c.12 3.31.07 7.44-.44 12.03l4.82 3.12c.42-4.21.48-8.38.38-12.05ZM1283.94 643.78l-3.75-2.45a93.875 93.875 0 0 1-5.19 8.72l3.33 2.22c1.92-2.7 3.84-5.56 5.61-8.49ZM1294.49 620.22l4.67 3.03c.68-4.2.88-8.21.84-11.73l-4.97-3.24c.07 3.69-.05 7.8-.53 11.94Z'
          style={{
            fill: '#2e425b',
          }}
        />
        <path
          d='M1306.05 593.74c-1.5-6.17-8.76-9.36-16.1-7.55-7.34 1.81-10.87 6.05-11.18 12.78-.3 6.73-.47 20.08-5.64 33.32-7.9 20.22-21.45 29.4-22.3 31.14-1.1 2.26-2.17 5.17-2.17 5.17l-302.82 35.77 1.07 10.63 303.57-36.74s5.3 2.6 8.75 1.95c5.59-1.05 33.85-5.98 44.04-39.85 8.61-28.62 4.24-40.58 2.77-46.64Zm-1.73 20.6-2.43-1.58c-.01 3.52-.28 7.47-1.02 11.6l3.48 2.26-1.01 1.56-2.86-1.85c-.68 3.17-1.64 6.42-2.99 9.63-.04.11-.09.21-.14.31l4.13 2.72-1.02 1.56-3.87-2.55c-1.36 2.98-2.94 5.94-4.63 8.8l4.92 3.22-1.02 1.56-4.86-3.18c-1.84 3.02-3.77 5.91-5.65 8.55l4.53 3.02-1.03 1.55-4.58-3.06c-2.09 2.87-4.06 5.41-5.72 7.46l2.5 1.67-1.03 1.55-2.65-1.77c-2.07 2.51-3.42 4-3.47 4.06l-1.38-1.26s1.32-1.46 3.29-3.84l-3.94-2.63c-3.73 4.53-6.44 7.44-6.52 7.51l-1.36-1.28c.07-.07 2.69-2.88 6.32-7.27l-3.31-2.21c-2.13 2.43-3.55 3.81-3.59 3.85l-1.29-1.35s1.34-1.3 3.32-3.54l-4.02-2.68 1.03-1.55 4.21 2.81c1.68-1.98 3.68-4.5 5.74-7.46l-2.93-1.96 1.03-1.55 2.95 1.97c1.76-2.63 3.54-5.55 5.17-8.72l-4.84-3.17 1.02-1.56 4.66 3.05c.94-1.92 1.81-3.91 2.6-5.98.43-1.14.83-2.27 1.18-3.41l-5.29-3.47 1.02-1.56 4.82 3.17c1.03-3.63 1.69-7.17 2.11-10.49l-3.48-2.26 1.01-1.56 2.7 1.75c.47-4.75.44-8.94.27-12.15l-3.7-2.41 1.02-1.56 2.51 1.64c-.22-2.59-.5-4.12-.51-4.17l1.83-.35c.01.06.41 2.23.64 5.8l4.79 3.12c-.29-5.85-.93-9.98-.94-10.07l1.84-.3c.07.43.81 5.16 1.05 11.64l4.97 3.24c-.26-6.06-1.18-10.16-1.2-10.24l1.82-.42c.09.39 1.15 5.13 1.33 11.93l3.47 2.26-1.02 1.56Z'
          style={{
            fill: '#2e425b',
          }}
        />
        <g
          style={{
            clipPath: 'url(#changingroom-f)',
          }}
        >
          <path
            d='m1044.59 665.78 9.59 55.99-209.36 33.44.56-43.28s200.41-46.3 199.21-46.14Z'
            style={{
              fill: '#e52d87',
            }}
          />
        </g>
        <path
          d='m1286.45 643.19 3.96 2.59c1.69-2.87 3.27-5.83 4.61-8.81l-4.04-2.66c-1.26 2.94-2.81 5.93-4.53 8.88ZM1279.87 653.3l3.93 2.63c1.88-2.64 3.81-5.52 5.64-8.54l-3.95-2.59c-1.78 2.94-3.7 5.8-5.62 8.5ZM1291.69 632.55l4.09 2.69c1.4-3.32 2.36-6.7 3.02-10.01l-4.58-2.97c-.52 3.54-1.32 7.05-2.53 10.29Z'
          style={{
            fill: '#2e425b',
          }}
        />
      </g>
    </svg>
  )
}

export default ChangingRoom