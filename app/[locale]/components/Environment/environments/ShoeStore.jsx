import { useTranslations } from 'next-intl'

const Nature = (props) => {
  const t = useTranslations()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='shoe-store-title'
      xmlSpace='preserve'
      {...props}
    >
      <title id='shoe-store-title'>
        {t('antagonists.salesPerson.components.background')}
      </title>
      <defs>
        <clipPath id='shoe-store-a'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h1920v1080H0z'
          />
        </clipPath>
        <clipPath id='shoe-store-b'>
          <path
            style={{
              fill: '#f0f5fb',
            }}
            d='m1197.68 883.42-2.99-808.3h375.4l8.95 853.04-381.36-44.74z'
          />
        </clipPath>
        <clipPath id='shoe-store-c'>
          <path
            d='M37.67 523.28c-7.49 2.5-9.11 12.82-6.07 16.52s38.45 8.09 61.04 7.76c22.6-.34 62.73 0 69.81-.67s16.86-4.72 16.86-4.72 1.35-20.91-2.02-32.71-9.44-19.9-9.44-19.9-3.37-.67-4.05 4.05 1.01 7.08-1.69 9.11-10.45 6.41-18.21 7.08-13.83-3.37-13.83-3.37 1.69-6.07-1.69-10.79-7.42-7.42-7.42-7.42-31.7 15.85-47.21 23.27c-15.51 7.42-19.9 9.11-23.61 9.78s-10.45 1.35-12.48 2.02Z'
            style={{
              fill: '#c4c7c9',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-d'>
          <path
            d='M218.66 521.77c-7.49 2.5-9.11 12.82-6.07 16.52s38.45 8.09 61.04 7.76c22.6-.34 62.73 0 69.81-.67s16.86-4.72 16.86-4.72 1.35-20.91-2.02-32.71-9.44-19.9-9.44-19.9-3.37-.67-4.05 4.05 1.01 7.08-1.69 9.11-10.45 6.41-18.21 7.08-13.83-3.37-13.83-3.37 1.69-6.07-1.69-10.79-7.42-7.42-7.42-7.42-31.7 15.85-47.21 23.27c-15.51 7.42-19.9 9.11-23.61 9.78s-10.45 1.35-12.48 2.02Z'
            style={{
              fill: '#9e6c30',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-e'>
          <path
            d='M42.48 666.11c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
            style={{
              fill: '#59bfcd',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-f'>
          <path
            d='M216.07 663.83c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
            style={{
              fill: '#97a5d0',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-g'>
          <path
            d='M457.59 668.09c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75-13.83-16.93-13.83-16.93-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
            style={{
              fill: '#005b9b',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-h'>
          <path
            d='M660.46 665.72c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41s116.03-.27 118.71-1.34 2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29-29.64 19.48-38.38 20.66-18.31-.14-21.65 1.95Z'
            style={{
              fill: '#afb1b4',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-i'>
          <path
            d='M34.52 384.34s-5.83 12.58 8.84 17.83c14.67 5.25 115.76 4.72 125.75 4.82 9.99.11 23.57-3.38 23.57-3.38s2.14-5.83-1.35-12.41-9.93-11.85-9.93-11.85-2.15-16.24-6.73-24.37-14.23-22.96-14.23-22.96l-4.84 2.57s11.64 17.41-5.85 18.89c-17.49 1.48-19.74-11.96-19.74-11.96s-31.63 17.94-50.15 27.15-24.55 13.56-31.55 14.08-13.8 1.56-13.8 1.56Z'
            style={{
              fill: '#4aa83f',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-j'>
          <path
            d='M222.85 379.79s-5.83 12.58 8.84 17.83c14.67 5.25 115.76 4.72 125.75 4.82s23.57-3.38 23.57-3.38 2.14-5.83-1.35-12.41-9.93-11.85-9.93-11.85-2.15-16.24-6.73-24.37c-4.58-8.12-14.23-22.96-14.23-22.96l-4.84 2.57s11.64 17.41-5.85 18.89c-17.49 1.48-19.74-11.96-19.74-11.96s-31.63 17.94-50.15 27.15c-18.53 9.21-24.55 13.56-31.55 14.08s-13.8 1.56-13.8 1.56Z'
            style={{
              fill: '#0090cb',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-k'>
          <path
            d='M31.1 234.57c.41 5.41 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s11.52-8.62 11.52-8.62 2.58-21.04-3.04-32.32-9.39-20.2-9.39-20.2l-16.81-.87s-4.47 16.28-15.58 15.9c-11.1-.38-10.26-3.39-10.26-3.39l4.38-6.08-11.79-19.85s-29.76 26.37-44.87 35.37-47.32 2.44-46.1 18.6Z'
            style={{
              fill: '#58b6e3',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-l'>
          <path
            d='M208.11 235.71c.41 5.41 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s11.52-8.62 11.52-8.62 2.58-21.04-3.04-32.32-9.39-20.2-9.39-20.2l-16.81-.87s-4.47 16.28-15.58 15.9c-11.1-.38-10.26-3.39-10.26-3.39l4.38-6.08-11.79-19.85s-29.76 26.37-44.87 35.37c-15.11 8.99-47.32 2.44-46.1 18.6Z'
            style={{
              fill: '#b0983a',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-m'>
          <path
            d='M216.19 91.7c-.73 5.38 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s14.51-3.02 14.51-3.02-.4-26.64-6.02-37.93-9.39-20.2-9.39-20.2l-6.38-2.55s-6.4 11.87-20.03 17.08c-10.37 3.97-18.85 1.77-18.85 1.77s3.19-10.39-1.18-18.26-14.14-4.71-14.14-4.71S270.11 69.81 255 78.81s-37.62 4.18-38.79 12.89Z'
            style={{
              fill: '#e2007a',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-n'>
          <path
            d='M507.66 524.76c-6.37 1.16-9.59 2.4-10.59 7.79s-.6 10.99-.6 10.99 31.57 5 67.94 5 79.13-2.6 79.13-2.6 4-3.6 2.8-20.18-6.79-29.97-6.79-29.97-6.59 11.59-19.58 12.99c-12.99 1.4-21.58-4.4-21.58-4.4s2.2-.8.4-7.59c-1.8-6.79-5.8-9.39-5.8-9.39s-59.75 30.97-67.74 34.57-15.39 2.4-17.59 2.8Z'
            style={{
              fill: '#f29e97',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-o'>
          <path
            d='M674.25 524.76c-6.37 1.16-9.59 2.4-10.59 7.79s-.6 10.99-.6 10.99 31.57 5 67.94 5 79.13-2.6 79.13-2.6 4-3.6 2.8-20.18c-1.2-16.59-6.79-29.97-6.79-29.97s-6.59 11.59-19.58 12.99c-12.99 1.4-21.58-4.4-21.58-4.4s2.2-.8.4-7.59-5.8-9.39-5.8-9.39-59.75 30.97-67.74 34.57-15.39 2.4-17.59 2.8Z'
            style={{
              fill: '#613f2f',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-p'>
          <path
            d='m517.42 194.9.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4-19.44 1.47-24.74 4.71-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24 5.15-6.77 3.98-8.83-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
            style={{
              fill: '#007581',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-q'>
          <path
            d='m661.12 191.28.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4-19.44 1.47-24.74 4.71-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24c1.77-4.42 5.15-6.77 3.98-8.83s-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
            style={{
              fill: '#d9433b',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-r'>
          <path
            d='M521.7 54.62s-6.88 7.64-14.24 15.47c-8.03 8.54-12.24 14.71-23.58 16.62-11.34 1.91-17.06-1.75-22.36 1.49s-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-7.21-21.5-7.21-21.5s-4.56-1.33-7.21 2.65-4.42 17.05-13.99 18.52-14.78-6.86-14.43-11.6c.3-3.95.57-8.49-.69-10.51-1.91-3.06-6.28-3.49-6.28-3.49Z'
            style={{
              fill: '#007ca6',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-s'>
          <path
            d='m808.44 192.42.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4c-11.34 1.91-19.44 1.47-24.74 4.71s-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28 82.9-.44 89.67-2.65 8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24c1.77-4.42 5.15-6.77 3.98-8.83s-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
            style={{
              fill: '#f19eb0',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-t'>
          <path
            d='M481.31 374.6c-5.73 1.53-7.95 7.07-6.78 10.31s4.42 9.72 4.42 9.72 20.62 9.72 41.24 9.13c20.62-.59 92.5-.29 101.64-1.47s13.26-2.65 15.91-9.72c2.65-7.07-2.65-14.14-2.65-14.14s-1.77-14.14-2.65-20.03c-.88-5.89-6.19-14.44-6.19-14.44s-7.36 14.73-22.09 15.32-21.21-23.86-21.21-23.86-51.55 25.04-61.87 29.46-35.35 8.54-39.77 9.72Z'
            style={{
              fill: '#9d8042',
            }}
          />
        </clipPath>
        <clipPath id='shoe-store-u'>
          <path
            d='M668.01 374.6c-5.73 1.53-7.95 7.07-6.78 10.31s4.42 9.72 4.42 9.72 20.62 9.72 41.24 9.13c20.62-.59 92.5-.29 101.64-1.47s13.26-2.65 15.91-9.72c2.65-7.07-2.65-14.14-2.65-14.14s-1.77-14.14-2.65-20.03-6.19-14.44-6.19-14.44-7.36 14.73-22.09 15.32c-14.73.59-21.21-23.86-21.21-23.86s-51.55 25.04-61.87 29.46-35.35 8.54-39.77 9.72Z'
            style={{
              fill: '#8cabbc',
            }}
          />
        </clipPath>
      </defs>
      <g
        style={{
          clipPath: 'url(#shoe-store-a)',
        }}
      >
        <path
          style={{
            fill: '#e4d2e2',
          }}
          d='M-248.32-150.32h2454.94v1353.69H-248.32z'
        />
        <path
          style={{
            fill: '#f0f5fb',
          }}
          d='m1197.68 883.42-2.99-808.3h375.4l8.95 853.04-381.36-44.74z'
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-b)',
          }}
        >
          <path
            d='m1066.57 208.19 613.04 444.56-14.16 501.19s-586.14-2.83-586.14-11.33-12.74-934.42-12.74-934.42Z'
            style={{
              fill: '#e6eef8',
            }}
          />
          <path
            d='m1063.53 243.73 613.04 444.56-14.16 501.19s-586.14-2.83-586.14-11.33-12.74-934.42-12.74-934.42Z'
            style={{
              fill: '#f2f6fb',
            }}
          />
          <path
            d='m1014.98 251.31 613.04 444.56-14.16 501.19s-586.14-2.83-586.14-11.33-12.74-934.42-12.74-934.42Z'
            style={{
              fill: '#e6eef8',
            }}
          />
          <path
            d='m983.11 354.5 613.04 444.56-14.16 501.19s-586.14-2.83-586.14-11.33-12.74-934.42-12.74-934.42Z'
            style={{
              fill: '#f2f6fb',
            }}
          />
        </g>
        <path
          style={{
            fill: '#e3dcd7',
          }}
          d='M-118.28-53.58H910.21V989.4H-118.28z'
        />
        <path
          style={{
            fill: '#fdfaf1',
          }}
          d='m888-89.43 5.75 1035.94 39.54-2.95-6.12-1034.22L888-89.43z'
        />
        <path
          d='M37.67 523.28c-7.49 2.5-9.11 12.82-6.07 16.52s38.45 8.09 61.04 7.76c22.6-.34 62.73 0 69.81-.67s16.86-4.72 16.86-4.72 1.35-20.91-2.02-32.71-9.44-19.9-9.44-19.9-3.37-.67-4.05 4.05 1.01 7.08-1.69 9.11-10.45 6.41-18.21 7.08-13.83-3.37-13.83-3.37 1.69-6.07-1.69-10.79-7.42-7.42-7.42-7.42-31.7 15.85-47.21 23.27c-15.51 7.42-19.9 9.11-23.61 9.78s-10.45 1.35-12.48 2.02Z'
          style={{
            fill: '#c4c7c9',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-c)',
          }}
        >
          <path
            d='M46.44 516.54s5.4 10.79 27.65 2.7 46.2-21.58 46.2-21.58l-14.84-12.14-59.02 31.03Z'
            style={{
              fill: '#2e425b',
            }}
          />
          <path
            style={{
              fill: '#2e425b',
            }}
            d='m77.13 512.49 28.67 30.02 8.09-2.7-28.33-31.03-8.43 3.71zm18.89-8.77 24.61 34.4 11.13-1.35-27.31-36.42-8.43 3.37z'
          />
          <path
            d='M19.12 526.99s15.51 4.38 37.43 5.73 31.36 2.7 35.07 6.41 3.37 11.13 3.37 11.13h5.4s-1.69-11.8 18.21-14.84 33.39.34 42.16-2.7c8.77-3.04 25.63-11.47 25.63-11.47l4.38 37.43-175.7-9.44 4.05-22.26Z'
            style={{
              fill: '#2e425b',
            }}
          />
        </g>
        <path
          d='M218.66 521.77c-7.49 2.5-9.11 12.82-6.07 16.52s38.45 8.09 61.04 7.76c22.6-.34 62.73 0 69.81-.67s16.86-4.72 16.86-4.72 1.35-20.91-2.02-32.71-9.44-19.9-9.44-19.9-3.37-.67-4.05 4.05 1.01 7.08-1.69 9.11-10.45 6.41-18.21 7.08-13.83-3.37-13.83-3.37 1.69-6.07-1.69-10.79-7.42-7.42-7.42-7.42-31.7 15.85-47.21 23.27c-15.51 7.42-19.9 9.11-23.61 9.78s-10.45 1.35-12.48 2.02Z'
          style={{
            fill: '#9e6c30',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-d)',
          }}
        >
          <path
            style={{
              fill: '#f1f1f3',
            }}
            d='M258.12 510.98 286.78 541l8.1-2.7-28.33-31.03-8.43 3.71zm18.88-8.77 24.62 34.4 11.13-1.35-27.32-36.42-8.43 3.37z'
          />
          <path
            d='M227.43 515.03s5.4 10.79 27.65 2.7c22.26-8.09 46.2-21.58 46.2-21.58l-14.84-12.14-59.02 31.03Z'
            style={{
              fill: '#ef8227',
            }}
          />
          <path
            d='M200.11 525.48s15.51 4.38 37.43 5.73c21.92 1.35 31.36 2.7 35.07 6.41s3.37 11.13 3.37 11.13h5.4s-1.69-11.8 18.21-14.84c19.9-3.04 33.39.34 42.16-2.7s25.63-11.47 25.63-11.47l4.38 37.43-175.7-9.44 4.05-22.26Z'
            style={{
              fill: '#d9433b',
            }}
          />
        </g>
        <path
          d='M42.48 666.11c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
          style={{
            fill: '#59bfcd',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-e)',
          }}
        >
          <path
            d='M13.39 664.13c1.36-.31 15.12 4.09 38.73 5.62 18.86 1.22 23.9 4.31 28.95 11.24s7.03 29.9 7.03 29.9l-55.92 11.76-18.79-58.52Z'
            style={{
              fill: '#ef8227',
            }}
          />
          <path
            d='M25.95 678.07s17.34 6.74 47.01 6.15c29.67-.59 51.03-12.14 66.2-12.78 15.17-.64 25.98.5 41.49-.15 15.5-.64 22.46-7.19 22.46-7.19s-.47 44.53.19 43.51-179.84-2.85-179.84-2.85 1.83-26.68 2.51-26.7Z'
            style={{
              fill: '#4b6c52',
            }}
          />
        </g>
        <path
          d='M216.07 663.83c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
          style={{
            fill: '#97a5d0',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-f)',
          }}
        >
          <path
            d='M186.98 661.85c1.36-.31 15.12 4.09 38.73 5.62 18.86 1.22 23.9 4.31 28.95 11.24s7.03 29.9 7.03 29.9l-55.92 11.76-18.79-58.52Z'
            style={{
              fill: '#ae3087',
            }}
          />
          <path
            d='M199.53 675.79s17.34 6.74 47.01 6.15c29.67-.59 51.03-12.14 66.2-12.78 15.17-.64 25.98.5 41.49-.15 15.5-.64 22.46-7.19 22.46-7.19s-.47 44.53.19 43.51-179.84-2.85-179.84-2.85 1.83-26.68 2.51-26.7Z'
            style={{
              fill: '#f1f1f3',
            }}
          />
        </g>
        <path
          d='M457.59 668.09c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41 18.27 3.01 116.03-.27 118.71-1.34s2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75-13.83-16.93-13.83-16.93-22.13 6.51-39.84 15.29c-17.7 8.78-29.64 19.48-38.38 20.66s-18.31-.14-21.65 1.95Z'
          style={{
            fill: '#005b9b',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-g)',
          }}
        >
          <path
            d='M428.5 666.11c1.36-.31 15.12 4.09 38.73 5.62 18.86 1.22 23.9 4.31 28.95 11.24s7.03 29.9 7.03 29.9l-55.92 11.76-18.79-58.52Z'
            style={{
              fill: '#e2a972',
            }}
          />
          <path
            d='M441.05 680.05s17.34 6.74 47.01 6.15c29.67-.59 51.03-12.14 66.2-12.78 15.17-.64 25.98.5 41.49-.15 15.5-.64 22.46-7.19 22.46-7.19s-.47 44.53.19 43.51-179.84-2.85-179.84-2.85 1.83-26.68 2.51-26.7Z'
            style={{
              fill: '#0090cb',
            }}
          />
        </g>
        <path
          d='M660.46 665.72c-6.05 3.8-9.45 9.68-7.05 13.8 3.49 6 20.8 11.39 39.08 14.41s116.03-.27 118.71-1.34 2.32-19.27-2.69-33.68-13.07-29.76-13.07-29.76l-9.45-.15s2.04 17.84-11.83 15.75c-13.87-2.09-13.83-16.93-13.83-16.93s-22.13 6.51-39.84 15.29-29.64 19.48-38.38 20.66-18.31-.14-21.65 1.95Z'
          style={{
            fill: '#afb1b4',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-h)',
          }}
        >
          <path
            d='M631.38 663.74c1.36-.31 15.12 4.09 38.73 5.62 18.86 1.22 23.9 4.31 28.95 11.24 5.05 6.93 7.03 29.9 7.03 29.9l-55.92 11.76-18.79-58.52Z'
            style={{
              fill: '#ebc300',
            }}
          />
          <path
            d='M643.93 677.68s17.34 6.74 47.01 6.15c29.67-.59 51.03-12.14 66.2-12.78 15.17-.64 25.98.5 41.49-.15 15.5-.64 22.46-7.19 22.46-7.19s-.47 44.53.19 43.51-179.84-2.85-179.84-2.85 1.83-26.68 2.51-26.7Z'
            style={{
              fill: '#c6cd59',
            }}
          />
        </g>
        <path
          d='M34.52 384.34s-5.83 12.58 8.84 17.83c14.67 5.25 115.76 4.72 125.75 4.82 9.99.11 23.57-3.38 23.57-3.38s2.14-5.83-1.35-12.41-9.93-11.85-9.93-11.85-2.15-16.24-6.73-24.37-14.23-22.96-14.23-22.96l-4.84 2.57s11.64 17.41-5.85 18.89c-17.49 1.48-19.74-11.96-19.74-11.96s-31.63 17.94-50.15 27.15-24.55 13.56-31.55 14.08-13.8 1.56-13.8 1.56Z'
          style={{
            fill: '#4aa83f',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-i)',
          }}
        >
          <path
            d='M25.09 385.63s28.78 8.76 44 8.04c15.23-.72 39.91-9.03 61.94-10.79s64.52-5.78 64.52-5.78l10.41 38.82-186.77-6.49 5.9-23.8Z'
            style={{
              fill: '#2e425b',
            }}
          />
          <path
            d='M81.28 397.58s16.25-16.34 40.14-21.13c23.89-4.79 33.83-13.97 39.98-20.42 6.15-6.46 12.48-12.92 12.49-12.39s23.62 41.83 23.62 41.83S90.82 400.68 90.29 400.7s-9.01-3.11-9.01-3.11Z'
            style={{
              fill: '#00a183',
            }}
          />
          <path
            d='M17.53 384.58s42.64 9.83 53.66 8.86c11.02-.97 53.54-10.59 72.42-12.1 18.89-1.51 49.84-4.02 49.84-4.02s5.08 35.97 4.03 35.82-172.16 3.66-172.16 3.66l-7.79-32.23Z'
            style={{
              fill: '#2e425b',
            }}
          />
        </g>
        <path
          d='M222.85 379.79s-5.83 12.58 8.84 17.83c14.67 5.25 115.76 4.72 125.75 4.82s23.57-3.38 23.57-3.38 2.14-5.83-1.35-12.41-9.93-11.85-9.93-11.85-2.15-16.24-6.73-24.37c-4.58-8.12-14.23-22.96-14.23-22.96l-4.84 2.57s11.64 17.41-5.85 18.89c-17.49 1.48-19.74-11.96-19.74-11.96s-31.63 17.94-50.15 27.15c-18.53 9.21-24.55 13.56-31.55 14.08s-13.8 1.56-13.8 1.56Z'
          style={{
            fill: '#0090cb',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-j)',
          }}
        >
          <path
            d='M213.42 381.07s28.78 8.76 44 8.04 39.91-9.03 61.94-10.79c22.04-1.76 64.52-5.78 64.52-5.78l10.41 38.82-186.77-6.49 5.9-23.8Z'
            style={{
              fill: '#2e425b',
            }}
          />
          <path
            d='M269.6 393.02s16.25-16.34 40.14-21.13c23.89-4.79 33.83-13.97 39.98-20.42 6.15-6.46 12.48-12.92 12.49-12.39s23.62 41.83 23.62 41.83-106.69 15.21-107.22 15.23-9.01-3.11-9.01-3.11Z'
            style={{
              fill: '#8cabbc',
            }}
          />
          <path
            d='M205.85 380.03s42.64 9.83 53.66 8.86c11.02-.97 53.54-10.59 72.42-12.1s49.84-4.02 49.84-4.02 5.08 35.97 4.03 35.82-172.16 3.66-172.16 3.66l-7.79-32.23Z'
            style={{
              fill: '#54535e',
            }}
          />
        </g>
        <path
          d='M31.1 234.57c.41 5.41 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s11.52-8.62 11.52-8.62 2.58-21.04-3.04-32.32-9.39-20.2-9.39-20.2l-16.81-.87s-4.47 16.28-15.58 15.9c-11.1-.38-10.26-3.39-10.26-3.39l4.38-6.08-11.79-19.85s-29.76 26.37-44.87 35.37-47.32 2.44-46.1 18.6Z'
          style={{
            fill: '#58b6e3',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-k)',
          }}
        >
          <path
            d='M148.35 245.46s-2.67-13.74 7.14-17.83c9.81-4.09 31.92-8.13 31.92-8.13l6.44 22.36-45.5 3.6Z'
            style={{
              fill: '#e4202c',
            }}
          />
          <path
            d='M65.09 213.19s8.23 11.42 18.96 5.54 32.63-21.94 32.63-21.94l-15.8-18.78L65.1 213.2Z'
            style={{
              fill: '#f4a019',
            }}
          />
          <path
            d='M17.89 233.93s21.63 17.56 55.17 15.4c33.54-2.16 31.33-7.52 57.14-6.53 25.8.99 39.88.11 47.35-.94s17.24-7.54 16.35-7.22 2.22 36.53 2.22 36.53l-183.31 9.02s4.47-46.86 5.08-46.27Z'
            style={{
              fill: '#613f2f',
            }}
          />
          <path
            style={{
              fill: '#c3e3e8',
            }}
            d='m80.9 221.29 25.6 20.78-6.89-14.24 40.66 8.78-30.86-29.37 1.65 14.58-30.16-.53z'
          />
        </g>
        <path
          d='M208.11 235.71c.41 5.41 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s11.52-8.62 11.52-8.62 2.58-21.04-3.04-32.32-9.39-20.2-9.39-20.2l-16.81-.87s-4.47 16.28-15.58 15.9c-11.1-.38-10.26-3.39-10.26-3.39l4.38-6.08-11.79-19.85s-29.76 26.37-44.87 35.37c-15.11 8.99-47.32 2.44-46.1 18.6Z'
          style={{
            fill: '#b0983a',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-l)',
          }}
        >
          <path
            d='M325.36 246.6s-2.67-13.74 7.14-17.83c9.81-4.09 31.92-8.13 31.92-8.13l6.44 22.36-45.5 3.6Z'
            style={{
              fill: '#eb6a36',
            }}
          />
          <path
            d='M242.11 214.33s8.23 11.42 18.96 5.54 32.63-21.94 32.63-21.94l-15.8-18.78-35.78 35.19Z'
            style={{
              fill: '#e41c80',
            }}
          />
          <path
            d='M194.91 235.07s21.63 17.56 55.17 15.4c33.54-2.16 31.33-7.52 57.14-6.53 25.8.99 39.88.11 47.35-.94 7.47-1.05 17.24-7.54 16.35-7.22s2.22 36.53 2.22 36.53l-183.31 9.02s4.47-46.86 5.08-46.27Z'
            style={{
              fill: '#1c3628',
            }}
          />
          <path
            style={{
              fill: '#ffd500',
            }}
            d='m257.92 222.43 25.59 20.78-6.88-14.23 40.66 8.77-30.87-29.37 1.66 14.58-30.16-.53z'
          />
        </g>
        <path
          d='M216.19 91.7c-.73 5.38 2.62 11.04 7.15 13.05s27.83 12.34 51.5 11.57c23.67-.77 79.42-1.57 83.29-3.15s14.51-3.02 14.51-3.02-.4-26.64-6.02-37.93-9.39-20.2-9.39-20.2l-6.38-2.55s-6.4 11.87-20.03 17.08c-10.37 3.97-18.85 1.77-18.85 1.77s3.19-10.39-1.18-18.26-14.14-4.71-14.14-4.71S270.11 69.81 255 78.81s-37.62 4.18-38.79 12.89Z'
          style={{
            fill: '#e2007a',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-m)',
          }}
        >
          <path
            d='M333.45 102.59s5.36-20.52 15.17-24.61 26.75-10.03 26.75-10.03L378.95 99l-45.5 3.6Z'
            style={{
              fill: '#eb6a36',
            }}
          />
          <path
            d='M269.03 113.95s-11.43-18.54-25-19.83c-13.57-1.28-36.74-2.41-36.74-2.41l2.21 31.28 59.53-9.05Z'
            style={{
              fill: '#940c3b',
            }}
          />
          <path
            d='M202.99 91.06s21.63 17.56 55.17 15.4c33.54-2.16 31.33-7.52 57.14-6.53 25.8.99 39.88.11 47.35-.94s17.24-7.54 16.35-7.22 2.22 36.53 2.22 36.53l-183.31 9.02s4.47-46.86 5.08-46.27Z'
            style={{
              fill: '#f19eb0',
            }}
          />
        </g>
        <path
          d='M507.66 524.76c-6.37 1.16-9.59 2.4-10.59 7.79s-.6 10.99-.6 10.99 31.57 5 67.94 5 79.13-2.6 79.13-2.6 4-3.6 2.8-20.18-6.79-29.97-6.79-29.97-6.59 11.59-19.58 12.99c-12.99 1.4-21.58-4.4-21.58-4.4s2.2-.8.4-7.59c-1.8-6.79-5.8-9.39-5.8-9.39s-59.75 30.97-67.74 34.57-15.39 2.4-17.59 2.8Z'
          style={{
            fill: '#f29e97',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-n)',
          }}
        >
          <path
            d='M555.22 517.57s9.59 8.19 12.19 12.39 3.6 11.59 3.6 11.59l23.78-3s-2-7.59-7.99-16.39-13.99-14.59-13.99-14.59l-17.59 9.99Z'
            style={{
              fill: '#df007a',
            }}
          />
          <path
            d='M519.45 516.97s6.19 14.39 20.98 11.19c14.79-3.2 56.95-24.58 56.95-24.58s-5.6-3.2-10.59-6.99-7.99-9.99-7.99-9.99l-59.35 30.37Z'
            style={{
              fill: '#eb6a36',
            }}
          />
          <path
            d='M488.88 526.36s12.39 8.19 56.75 8.59c44.36.4 113.7-2.2 113.7-2.2l4.2 34.77s-166.26-5.4-166.26-4.8-9.99-26.18-9.99-26.18l1.6-10.19Z'
            style={{
              fill: '#2e425b',
            }}
          />
        </g>
        <path
          d='M674.25 524.76c-6.37 1.16-9.59 2.4-10.59 7.79s-.6 10.99-.6 10.99 31.57 5 67.94 5 79.13-2.6 79.13-2.6 4-3.6 2.8-20.18c-1.2-16.59-6.79-29.97-6.79-29.97s-6.59 11.59-19.58 12.99c-12.99 1.4-21.58-4.4-21.58-4.4s2.2-.8.4-7.59-5.8-9.39-5.8-9.39-59.75 30.97-67.74 34.57-15.39 2.4-17.59 2.8Z'
          style={{
            fill: '#613f2f',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-o)',
          }}
        >
          <path
            d='M721.81 517.57s9.59 8.19 12.19 12.39 3.6 11.59 3.6 11.59l23.78-3s-2-7.59-7.99-16.39c-5.99-8.79-13.99-14.59-13.99-14.59l-17.59 9.99Z'
            style={{
              fill: '#f19eb0',
            }}
          />
          <path
            d='M686.04 516.97s6.19 14.39 20.98 11.19c14.79-3.2 56.95-24.58 56.95-24.58s-5.6-3.2-10.59-6.99-7.99-9.99-7.99-9.99l-59.35 30.37Z'
            style={{
              fill: '#9d8042',
            }}
          />
          <path
            d='M655.46 526.36s12.39 8.19 56.75 8.59c44.36.4 113.7-2.2 113.7-2.2l4.2 34.77s-166.26-5.4-166.26-4.8-9.99-26.18-9.99-26.18l1.6-10.19Z'
            style={{
              fill: '#5a5099',
            }}
          />
        </g>
        <path
          style={{
            fill: '#fdfaf1',
          }}
          d='m-75.55 260.1 485.91-.37-.44 19.28-486.75 1.69 1.28-20.6zm0-144.86 485.91-.37-.44 19.28-486.75 1.69 1.28-20.6zm0 579.43 485.91-.37-.44 19.28-486.75 1.69 1.28-20.6zm-.63-289.61 485.91-.38-.2 20.78-485.74-2.33.03-18.07zm.14 144.32 485.91-.37.04 21.84-486.29-3.34.34-18.13z'
        />
        <path
          style={{
            fill: '#fdfaf1',
          }}
          d='m394.77-101.51 5.76 1035.95 39.53-2.96-6.12-1034.21-39.17 1.22z'
        />
        <path
          d='m517.42 194.9.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4-19.44 1.47-24.74 4.71-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24 5.15-6.77 3.98-8.83-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
          style={{
            fill: '#007581',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-p)',
          }}
        >
          <path
            d='M529.6 249s-.44-7.21-12.66-10.9c-12.22-3.68-25.47-7.36-25.47-7.36l4.27-3.53s24.57-.14 37.23 5.01 24.61 14.57 24.61 14.57L529.6 249Z'
            style={{
              fill: '#f4a019',
            }}
          />
          <path
            d='M447.15 235.9s1.03 9.87 11.34 13.55 22.82 5.89 35.48 3.98 26.36-8.69 40.05-9.42c13.69-.74 22.82.59 27.98-2.5 5.15-3.09 5.89-10.16 5.89-10.16l10.01 41.96-127.36 11.19-13.99-41.96 10.6-6.63Z'
            style={{
              fill: '#009794',
            }}
          />
        </g>
        <path
          d='m661.12 191.28.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4-19.44 1.47-24.74 4.71-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24c1.77-4.42 5.15-6.77 3.98-8.83s-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
          style={{
            fill: '#d9433b',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-q)',
          }}
        >
          <path
            d='M673.3 245.38s-.44-7.21-12.66-10.9c-12.22-3.68-25.47-7.36-25.47-7.36l4.27-3.53s24.57-.14 37.23 5.01c12.66 5.15 24.61 14.57 24.61 14.57l-27.98 2.21Z'
            style={{
              fill: '#d083b2',
            }}
          />
          <path
            d='M590.85 232.28s1.03 9.87 11.34 13.55 22.82 5.89 35.48 3.98 26.36-8.69 40.05-9.42 22.82.59 27.98-2.5 5.89-10.16 5.89-10.16l10.01 41.96-127.36 11.19-13.99-41.96 10.6-6.63Z'
            style={{
              fill: '#7b408e',
            }}
          />
        </g>
        <path
          d='M521.7 54.62s-6.88 7.64-14.24 15.47c-8.03 8.54-12.24 14.71-23.58 16.62-11.34 1.91-17.06-1.75-22.36 1.49s-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28c15.9 2.06 82.9-.44 89.67-2.65s8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-7.21-21.5-7.21-21.5s-4.56-1.33-7.21 2.65-4.42 17.05-13.99 18.52-14.78-6.86-14.43-11.6c.3-3.95.57-8.49-.69-10.51-1.91-3.06-6.28-3.49-6.28-3.49Z'
          style={{
            fill: '#007ca6',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-r)',
          }}
        >
          <path
            d='M454.75 89.37s3.96 12.16 13.47 17.58 20.86 5.22 33.52 3.3c12.66-1.91 22.71-10.74 36.4-11.48s29.28 1.12 34.44-1.97 2.91-12 2.91-12l10.01 41.96-127.36 11.19-13.99-41.96 10.6-6.63Z'
            style={{
              fill: '#58b6e3',
            }}
          />
        </g>
        <path
          d='m808.44 192.42.55 7.28s-8.54 7.66-18.11 14.43-9.87 11.48-21.2 13.4c-11.34 1.91-19.44 1.47-24.74 4.71s-3.98 9.57-2.8 13.25 5.3 12.22 21.2 14.28 82.9-.44 89.67-2.65 8.98-8.69 8.98-8.69-2.21-16.05-7.07-23.85c-4.86-7.8-5.01-12.07-5.01-16.2s.15-10.45.15-10.45l-2.21-1.91-.15 7.07s-4.56-1.33-7.21 2.65-6.48 8.69-16.05 10.16-14.14 1.18-12.37-3.24c1.77-4.42 5.15-6.77 3.98-8.83s-4.71-3.98-4.71-3.98l1.62-7.66-4.53.23Z'
          style={{
            fill: '#f19eb0',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-s)',
          }}
        >
          <path
            d='M820.62 246.52s-.44-7.21-12.66-10.9c-12.22-3.68-25.47-7.36-25.47-7.36l4.27-3.53s24.57-.14 37.23 5.01c12.66 5.15 24.61 14.57 24.61 14.57l-27.98 2.21Z'
            style={{
              fill: '#ed7925',
            }}
          />
          <path
            d='M738.17 233.42s1.03 9.87 11.34 13.55 22.82 5.89 35.48 3.98c12.66-1.91 26.36-8.69 40.05-9.42s22.82.59 27.98-2.5 5.89-10.16 5.89-10.16l10.01 41.96-127.36 11.19-13.99-41.96 10.6-6.63Z'
            style={{
              fill: '#db1f81',
            }}
          />
        </g>
        <path
          d='M481.31 374.6c-5.73 1.53-7.95 7.07-6.78 10.31s4.42 9.72 4.42 9.72 20.62 9.72 41.24 9.13c20.62-.59 92.5-.29 101.64-1.47s13.26-2.65 15.91-9.72c2.65-7.07-2.65-14.14-2.65-14.14s-1.77-14.14-2.65-20.03c-.88-5.89-6.19-14.44-6.19-14.44s-7.36 14.73-22.09 15.32-21.21-23.86-21.21-23.86-51.55 25.04-61.87 29.46-35.35 8.54-39.77 9.72Z'
          style={{
            fill: '#9d8042',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-t)',
          }}
        >
          <path
            d='M528.15 367.23s5.89 10.31 23.86 10.9 27.78-7.54 39.18-6.19c11.14 1.32 19.15 7.07 19.15 7.07l3.83-6.78s-9.13-7.36-23.27-8.54-28.38 6.47-38.42 6.47c-10.88 0-15.79-7.04-15.79-7.04l-8.54 4.11Z'
            style={{
              fill: '#fdfaf1',
            }}
          />
          <path
            d='M487.2 368.41s-3.54 7.07 10.61 8.25c14.14 1.18 23.57 2.36 30.93 6.19s6.48 13.55 6.48 13.55l-62.75-6.78-7.95-16.2 22.68-5.01Z'
            style={{
              fill: '#d88b46',
            }}
          />
          <path
            d='M505.18 366.64s7.95 6.48 26.22 3.54c18.27-2.95 45.37-15.91 45.37-15.91l10.02 7.07 14.44-10.61-41.24-42.13-63.34 35.65 8.54 22.39Zm130.5-15.32s-20.62 10.31-25.34 18.56c-4.71 8.25-7.95 18.56-7.95 18.56l32.7-2.06 8.84-17.09-8.25-17.97Z'
            style={{
              fill: '#613f2f',
            }}
          />
          <path
            d='M506.06 390.21s4.42 1.18 27.99 0 45.66-8.54 58.92-8.84c13.26-.29 35.06-.59 39.18-1.77s12.67-4.71 12.67-4.71l.59 40.95-155.25 3.83 15.91-29.46Z'
            style={{
              fill: '#f6bcc8',
            }}
          />
          <path
            d='M465.99 372.83s4.71 6.48 16.2 9.43c11.49 2.95 25.63 2.95 30.64 7.66 5.01 4.71 8.25 20.92 8.25 20.92l-76.6-6.19 21.51-31.82Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </g>
        <path
          d='M668.01 374.6c-5.73 1.53-7.95 7.07-6.78 10.31s4.42 9.72 4.42 9.72 20.62 9.72 41.24 9.13c20.62-.59 92.5-.29 101.64-1.47s13.26-2.65 15.91-9.72c2.65-7.07-2.65-14.14-2.65-14.14s-1.77-14.14-2.65-20.03-6.19-14.44-6.19-14.44-7.36 14.73-22.09 15.32c-14.73.59-21.21-23.86-21.21-23.86s-51.55 25.04-61.87 29.46-35.35 8.54-39.77 9.72Z'
          style={{
            fill: '#8cabbc',
          }}
        />
        <g
          style={{
            clipPath: 'url(#shoe-store-u)',
          }}
        >
          <path
            d='M714.85 367.23s7.24 10.18 25.21 10.77c17.97.59 25.94-7.86 37.83-6.06 10.4 1.58 18.29 8.41 18.29 8.41l4.69-8.11s-9.13-7.36-23.27-8.54c-14.14-1.18-28.57 5.34-37.12 5.6-6.83.2-15.61-6.19-15.61-6.19l-10.02 4.12Z'
            style={{
              fill: '#fdfaf1',
            }}
          />
          <path
            d='M673.9 368.41s-3.54 7.07 10.61 8.25c14.14 1.18 23.57 2.36 30.93 6.19s6.48 13.55 6.48 13.55l-62.75-6.78-7.95-16.2 22.68-5.01Z'
            style={{
              fill: '#2e425b',
            }}
          />
          <path
            d='M691.87 366.64s7.95 6.48 26.22 3.54 45.37-15.91 45.37-15.91l10.02 7.07 14.44-10.61-41.24-42.13-63.34 35.65 8.54 22.39Z'
            style={{
              fill: '#54535e',
            }}
          />
          <path
            d='M822.38 351.32s-20.62 10.31-25.34 18.56c-4.71 8.25-7.95 18.56-7.95 18.56l32.7-2.06 8.84-17.09-8.25-17.97Z'
            style={{
              fill: '#00658b',
            }}
          />
          <path
            d='M692.75 390.21s4.42 1.18 27.99 0 45.66-8.54 58.92-8.84c13.26-.29 35.06-.59 39.18-1.77s12.67-4.71 12.67-4.71l.59 40.95-155.25 3.83 15.91-29.46Z'
            style={{
              fill: '#c4c7c9',
            }}
          />
          <path
            d='M652.69 372.83s4.71 6.48 16.2 9.43 25.63 2.95 30.64 7.66 8.25 20.92 8.25 20.92l-76.6-6.19 21.51-31.82Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </g>
        <path
          style={{
            fill: '#fdfaf1',
          }}
          d='m421.79 260.1 485.91-.37-.44 19.28-486.74 1.69 1.27-20.6zm0-144.86 485.91-.37-.44 19.28-486.74 1.69 1.27-20.6zm0 579.43 485.91-.37-.44 19.28-486.74 1.69 1.27-20.6zm-5.19-290.76 485.91-.37 4.37 21.92-485.74-2.33-4.54-19.22zm4.7 145.47 485.91-.37.05 21.84-486.3-3.34.34-18.13z'
        />
        <path
          d='m1301.95 653.69 338.42-.89 1.78 233.39-340.65 3.53.45-236.03Zm13.75 249.58 312.55 4.89-2.19-228.79-308.43-1.29-1.94 225.19Z'
          style={{
            fill: '#59bfcd',
          }}
        />
        <path
          d='M1306.57 626.31c-11.31.86-14.62 5.97-14.95 16.88-.48 15.92 10.9 17.36 18.4 17.36 11.28 0 322.07-.27 330.22-.75 8.14-.48 8.67-7.29 8.67-18.31s-2.44-16.53-13.46-17.49c-11.02-.96-314.04 1.18-328.88 2.3Z'
          style={{
            fill: '#ef821b',
          }}
        />
        <path
          d='m1722.19 652.89 338.42-.89 1.78 233.39-340.65 3.53.45-236.03Zm13.75 249.58 312.55 4.89-2.19-228.79-308.43-1.29-1.94 225.19Z'
          style={{
            fill: '#009250',
          }}
        />
        <path
          d='M1726.81 625.51c-11.34-.12-14.62 5.97-14.95 16.88-.48 15.92 9.86 16.88 17.36 16.88 11.28 0 323.11.22 331.25-.26s8.67-7.29 8.67-18.31-2.44-16.53-13.46-17.49c-11.02-.96-317.53 2.42-328.88 2.3Z'
          style={{
            fill: '#fee608',
          }}
        />
        <path
          id='ENVIRONMENT_BACKGROUND'
          style={{
            fill: '#d2af92',
          }}
          d='M2315.62 1610.54H-345.84v-733.8l2643.89-13.34 17.57 747.14z'
        />
      </g>
    </svg>
  )
}

export default Nature