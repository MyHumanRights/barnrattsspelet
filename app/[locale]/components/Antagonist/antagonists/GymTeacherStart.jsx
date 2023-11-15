import { useTranslations } from 'next-intl'

const GymTeacherStart = (props) => {
  const t = useTranslations()
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='gymteacher-start-title'
      {...props}
    >
      <title id='gymteacher-start-title'>
        {t('antagonists.gymteacher.components.start')}
      </title>
      <defs>
        <clipPath id='b'>
          <path
            d='M1537.3 305.71c4.07-3.67 14.18-14.95 17.55-18.95 5.55-6.58 8.47-35.1 9.09-47.25.62-12.15 1.21-35.8-.94-41.19-2.15-5.38-9.85-15.08-33.85-15.39s-35.23 11.85-38 20.46c-2.77 8.62-1.72 32.48-2.46 45.23-.71 12.17 2.77 26.46 6 33.85 3.23 7.39 10.62 18.46 17.39 23.23 6.77 4.77 22.16 2.77 25.23 0Z'
            style={{
              fill: '#d4a55e',
            }}
          />
        </clipPath>
        <clipPath id='c'>
          <path
            d='M1579.5 696.9s6.21 41.21 11.85 57.01c5.64 15.81 23.14 42.34 23.71 46.29.56 3.95 0 28.79 6.21 47.42 6.21 18.63 22.58 57.01 24.84 70.56 2.26 13.55 5.08 29.92 5.08 29.92l25.97-5.08s-9.03-44.03-7.9-69.43c1.13-25.4-1.69-50.8-6.21-63.22-4.52-12.42-16.37-36.13-19.76-52.5-3.39-16.37-10.73-68.3-10.73-68.3l-53.06 7.34Z'
            style={{
              fill: '#d4a55e',
            }}
          />
        </clipPath>
        <clipPath id='d'>
          <path
            d='M1469.39 652s8.07 100.02 8.07 119.38-10.22 40.87-8.6 60.77c1.61 19.9 17.21 124.76 17.21 124.76l29.58 12.37s-6.99-25.81-6.99-51.09c0-25.27 11.29-51.09 12.37-67.22 1.08-16.13-3.76-47.86-3.23-56.46.54-8.6 10.22-29.04 9.68-48.4-.54-19.36 2.69-76.36 2.69-76.36L1469.4 652Z'
            style={{
              fill: '#d4a55e',
            }}
          />
        </clipPath>
        <clipPath id='e'>
          <path
            d='M1499.31 951.59s7.26.7 9.83 0c2.57-.7 1.4-7.26 3.51-7.26s11.24 42.13 11.24 46.81-10.53 6.09-16.15 8.43c-5.62 2.34-7.49 8.89-7.49 8.89s-39.09 1.17-43.07-.7c-3.98-1.87-3.28-9.36-.23-16.62 3.04-7.26 9.6-11.47 13.81-16.15 4.21-4.68 6.09-21.77 6.09-21.77l22.47-1.64Z'
            style={{
              fill: '#f1f1f3',
            }}
          />
        </clipPath>
        <clipPath id='f'>
          <path
            d='M1647.6 943.48c-2.11 1.21 1.34 17.96.28 24.44s-1.21 32.41-1.21 32.41 7.99 2.56 21.7 2.41c13.72-.15 22.01-1.21 23.51-3.62 1.51-2.41 1.21-12.21-1.06-19.59-2.26-7.39-4.07-10.1-5.12-15.68-1.06-5.58-3.62-19.75-4.37-23.21-.75-3.47-12.21-7.23-18.54-5.88-6.33 1.36-15.21 8.72-15.21 8.72Z'
            style={{
              fill: '#f1f1f3',
            }}
          />
        </clipPath>
        <clipPath id='g'>
          <path
            d='M1471.89 521.78s24.51 10.09 61.99 11.53c37.48 1.44 68.48-7.93 68.48-7.93l2.92 11.02s15.32 29.94 17.41 63.36 23.01 112.73 23.01 112.73-25.8 3.55-46.68 7.03c-20.89 3.48-47.35-.7-47.35-.7s-22.28-61.27-27.15-103.05c-4.87-41.78-45.26-68.24-45.26-68.24l-7.37-25.77Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
        <clipPath id='h'>
          <path
            d='M1449.73 717.22s27.44-7.44 46.93-3.26 39.69 4.18 39.69 4.18 18.1-81.47 17.41-79.38c-.7 2.09-8.36-105.84-8.36-105.84s-41.08-2.09-51.52-2.09c-10.44 0-19.5-5.57-19.5-5.57l-1.39 10.44s-12.53 8.36-12.53 35.51c0 27.16-10.73 146-10.73 146Z'
            style={{
              fill: '#272a3e',
            }}
          />
        </clipPath>
        <clipPath id='i'>
          <path
            d='M1489.71 304.7s2.26 5.8 11.92 18.69c9.67 12.89 25.13 26.08 25.13 26.08s18.24-18.63 24.68-27.65c6.44-9.02 7.86-24.21 7.86-24.21s29 10.63 39.63 14.82c10.63 4.19 23.84 9.34 26.1 14.5 2.26 5.16-16.11 38.34-17.08 52.2-.97 13.86 3.22 73.79 2.9 87.96-.32 14.18 5.48 62.19 8.38 78.94 2.9 16.76 1.84 22.99 1.84 22.99s-56.26 9.44-92.02 12.02c-35.77 2.58-70.92-4.9-70.92-4.9s5.48-34.3 9.02-54.6c3.54-20.3 4.51-67.34 3.87-78.62-.64-11.28-11.28-59.61-18.37-77.33-7.09-17.72-25.62-20.45-15.79-29.32 5.27-4.75 19.01-13.21 28.03-17.72 9.02-4.51 24.81-13.86 24.81-13.86Z'
            style={{
              fill: '#feca1b',
            }}
          />
        </clipPath>
        <style>
          {
            '.j{fill:none;stroke:#272a3e;stroke-linecap:round;stroke-miterlimit:10;stroke-width:1.68px}.k{fill:#f8f7f0}.l{fill:#009250}.m{fill:#009794}.n{fill:#f1f1f3}.o{fill:#e5ca9c}.p{fill:#feca1b}.q{fill:#8cabbc}.r{fill:#d4a55e}.s{fill:#3fa25a}.t{fill:#406229}.u{fill:#1c3628}.v{fill:#464640}.w{fill:#4a4630}.x{fill:#272a3e}.y{fill:#75c6cf}.aa{clip-path:url(#b)}.ab{clip-path:url(#f)}.ac{clip-path:url(#e)}.ad{clip-path:url(#d)}.ae{clip-path:url(#i)}.af{clip-path:url(#h)}.ag{clip-path:url(#g)}'
          }
        </style>
      </defs>
      <path
        d='M1495.44 241.67s3.44 30.41 4.02 42.46-7.85 21.16-13.02 23.45c-5.16 2.3-35.4 21.04-35.4 21.04l1.36 31.25 70.01 71.16 61.4-90.09 8.61-27.54c-.13.02-31.26-4.92-36.13-20.6-4.96-15.98-2.32-45.96-2.32-45.96l-58.53-5.16Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1491.3 242.79s-5.23-6.46-9.08-5.23c-3.85 1.23-.31 7.69-.46 12.92-.15 5.23 1.23 12 4.46 12.62 3.23.62 8.62-1.85 8.15-1.85s-3.08-18.46-3.08-18.46ZM1560.23 244.94s6.46-6.15 11.08-2.62c4.62 3.54-1.08 8.31-2.46 12.77-1.38 4.46-2.77 10.62-6.92 11.39-4.15.77-7.23-1.08-7.23-1.08l5.54-20.46Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1537.3 305.71c4.07-3.67 14.18-14.95 17.55-18.95 5.55-6.58 8.47-35.1 9.09-47.25.62-12.15 1.21-35.8-.94-41.19-2.15-5.38-9.85-15.08-33.85-15.39s-35.23 11.85-38 20.46c-2.77 8.62-1.72 32.48-2.46 45.23-.71 12.17 2.77 26.46 6 33.85 3.23 7.39 10.62 18.46 17.39 23.23 6.77 4.77 22.16 2.77 25.23 0Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#b)',
        }}
      >
        <path
          d='M1526.59 222.03c8.23.34 21.56-6.42 23.71-7.23 2.12-.8 5.19-.52 6.23 1.41 1.04 1.92 4.22 6.43 2.61 10.85-1.61 4.42-2.81 7.63-2.81 7.63l4.02 14.87 3.01-.4 15.07-61.48-45.41-21.9-48.22 28.33 3.89 54.53 3.15-1.09 4.42-14.06s-2.93-8.25-1.81-12.66c1.65-6.47 6.62-7.23 9.83-6.14 3.21 1.09 7.65 6.74 22.32 7.34Z'
          style={{
            fill: '#4a4630',
          }}
        />
      </g>
      <path
        d='M1511.15 285.49c.22 1.3 2.61-.39 4.3.99s6.46 4.15 10 3.85 7.06-2.76 8.74-3.02c3.85-.58 4.56-.62 4.94-2.03.29-1.08-5.38-2.8-9.23-2.34-3.85.46-3.54 1.23-4.92 1.38-1.38.15-1.85-1.54-5.08-1.08-3.23.46-9.07.39-8.77 2.24Z'
        style={{
          fill: '#e5ca9c',
        }}
      />
      <path
        d='M1530.84 247.86c.46 0 12.31-3.08 15.08-2.92 2.77.15 8.46 4.77 8.46 4.77l-2 2.15s-5.23-2.31-7.39-2.92c-2.15-.62-12.92 3.08-12.92 3.08l-1.23-4.15ZM1518.99 251.25l1.08-4.31s-13.85-4-16-3.69c-2.15.31-8.46 4-8.46 4l1.69 2.15s5.08-2.15 7.85-1.69c2.77.46 13.85 3.54 13.85 3.54Z'
        style={{
          fill: '#464640',
        }}
      />
      <path
        d='M1511.45 251.61c-1.99-.05-3.42 1.26-3.39 3.21.04 1.95 1.29 2.77 3.07 2.93 2.11.18 3.34-1.07 3.51-3.07.12-1.42-1.14-3.02-3.19-3.07ZM1539.91 252.32c-1.99-.05-3.42 1.26-3.39 3.21.04 1.95 1.29 2.77 3.07 2.93 2.11.18 3.34-1.07 3.51-3.07.12-1.42-1.14-3.02-3.19-3.07Z'
        style={{
          fill: '#406229',
        }}
      />
      <path
        style={{
          fill: '#464640',
        }}
        d='m1535.87 254.32 9.81-1.76-.89-4.06-10.08 3.28 1.16 2.54zM1504.37 252.11l10.74 2.14 1.1-2.65-10.78-3.64-1.06 4.15z'
      />
      <path
        d='M1579.5 696.9s6.21 41.21 11.85 57.01c5.64 15.81 23.14 42.34 23.71 46.29.56 3.95 0 28.79 6.21 47.42 6.21 18.63 22.58 57.01 24.84 70.56 2.26 13.55 5.08 29.92 5.08 29.92l25.97-5.08s-9.03-44.03-7.9-69.43c1.13-25.4-1.69-50.8-6.21-63.22-4.52-12.42-16.37-36.13-19.76-52.5-3.39-16.37-10.73-68.3-10.73-68.3l-53.06 7.34Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#c)',
        }}
      >
        <path
          d='M1653.3 866.03c12.14-2.58 24.2-12.37 24.2-12.37l13.98 89.81-49.47 16.13-24.74-97.33s18.28 7.53 36.03 3.76Z'
          style={{
            fill: '#75c6cf',
          }}
        />
        <path
          d='M1656.24 875.62c12.14-2.58 24.2-12.37 24.2-12.37l13.98 89.81-49.47 16.13-24.74-97.33s18.28 7.53 36.03 3.76Z'
          style={{
            fill: '#009794',
          }}
        />
      </g>
      <path
        d='M1469.39 652s8.07 100.02 8.07 119.38-10.22 40.87-8.6 60.77c1.61 19.9 17.21 124.76 17.21 124.76l29.58 12.37s-6.99-25.81-6.99-51.09c0-25.27 11.29-51.09 12.37-67.22 1.08-16.13-3.76-47.86-3.23-56.46.54-8.6 10.22-29.04 9.68-48.4-.54-19.36 2.69-76.36 2.69-76.36L1469.4 652Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#d)',
        }}
      >
        <path
          d='M1490.36 872.48c11.88 0 33.34-6.99 33.34-6.99l5.92 114-70.45-.54-2.15-118.84s19.9 12.37 33.34 12.37Z'
          style={{
            fill: '#75c6cf',
          }}
        />
        <path
          d='M1491.02 882.6c11.88 0 33.34-6.99 33.34-6.99l5.92 114-70.45-.54-2.15-118.84s19.9 12.37 33.34 12.37Z'
          style={{
            fill: '#009794',
          }}
        />
      </g>
      <path
        d='M1499.31 951.59s7.26.7 9.83 0c2.57-.7 1.4-7.26 3.51-7.26s11.24 42.13 11.24 46.81-10.53 6.09-16.15 8.43c-5.62 2.34-7.49 8.89-7.49 8.89s-39.09 1.17-43.07-.7c-3.98-1.87-3.28-9.36-.23-16.62 3.04-7.26 9.6-11.47 13.81-16.15 4.21-4.68 6.09-21.77 6.09-21.77l22.47-1.64Z'
        style={{
          fill: '#f1f1f3',
        }}
      />
      <g
        style={{
          clipPath: 'url(#e)',
        }}
      >
        <path
          d='M1447.82 1008.01s8.66-1.4 11.7-5.38 2.86-8.35 2.86-8.35l10.95-.31s.7 7.02 11.94 10.53 19.9 2.81 19.9 2.81l-3.75 13.58-54.3-3.04.7-9.83Z'
          style={{
            fill: '#1c3628',
          }}
        />
      </g>
      <path
        d='M1497.98 954.33s6.79 8.89 8.66 14.51c1.87 5.62.94 13.58.94 13.58l3.75-2.57s.94-8.66-.7-13.58-8.66-14.75-8.66-14.75l-3.98 2.81Z'
        style={{
          fill: '#009250',
        }}
      />
      <path
        d='M1647.6 943.48c-2.11 1.21 1.34 17.96.28 24.44s-1.21 32.41-1.21 32.41 7.99 2.56 21.7 2.41c13.72-.15 22.01-1.21 23.51-3.62 1.51-2.41 1.21-12.21-1.06-19.59-2.26-7.39-4.07-10.1-5.12-15.68-1.06-5.58-3.62-19.75-4.37-23.21-.75-3.47-12.21-7.23-18.54-5.88-6.33 1.36-15.21 8.72-15.21 8.72Z'
        style={{
          fill: '#f1f1f3',
        }}
      />
      <g
        style={{
          clipPath: 'url(#f)',
        }}
      >
        <path
          d='M1651.8 942.9s-3.77 3.32-4.07 7.54c-.3 4.22-.9 11.91-.9 11.91l1.66 3.32s-.45-11.76 1.81-14.62 6.63-7.69 6.63-7.69l-5.12-.45Z'
          style={{
            fill: '#3fa25a',
          }}
        />
        <path
          d='M1642.91 1000.33s13.57-.45 15.68-4.07c2.11-3.62 2.86-5.73 2.86-5.73l9.5-.3s1.4 5.18 7.13 7.44c5.73 2.26 18.34-.5 18.34-.5l1.96 14.02-56.07-3.47.6-7.39Z'
          style={{
            fill: '#272a3e',
          }}
        />
      </g>
      <path
        d='M1665.37 926.62c-8.57.39-18.2 10.68-18.2 10.68l1.77 8.16 10.7 1.36 2.11 22.01 9.5-.15.75-22.46 6.48-.15.3-8.44s-3.47-11.46-13.41-11ZM1490.19 937.78c-5.39.38-13.58 14.28-13.58 14.28l-.47 8.89 5.15.23-7.49 16.41 8.64 1.23 13.6-22.1 10.66 1.21 1.93-6.27s-8.38-14.6-18.45-13.89ZM1471.89 521.78s24.51 10.09 61.99 11.53c37.48 1.44 68.48-7.93 68.48-7.93l2.92 11.02s15.32 29.94 17.41 63.36 23.01 112.73 23.01 112.73-25.8 3.55-46.68 7.03c-20.89 3.48-47.35-.7-47.35-.7s-22.28-61.27-27.15-103.05c-4.87-41.78-45.26-68.24-45.26-68.24l-7.37-25.77Z'
        style={{
          fill: '#272a3e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#g)',
        }}
      >
        <path
          d='M1543.31 711.34s34.97 1.9 46.22 1.34c11.25-.56 64.91-9.42 64.91-9.42l.32 24.04-113.03 10.12 1.58-26.08Z'
          style={{
            fill: '#f1f1f3',
          }}
        />
      </g>
      <path
        d='M1449.73 717.22s27.44-7.44 46.93-3.26 39.69 4.18 39.69 4.18 18.1-81.47 17.41-79.38c-.7 2.09-8.36-105.84-8.36-105.84s-41.08-2.09-51.52-2.09c-10.44 0-19.5-5.57-19.5-5.57l-1.39 10.44s-12.53 8.36-12.53 35.51c0 27.16-10.73 146-10.73 146Z'
        style={{
          fill: '#272a3e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#h)',
        }}
      >
        <path
          d='M1438.25 709.87s30.37-7.87 51.73-5.06c21.37 2.81 55.28 7.76 55.28 7.76l-2.98 17.55-106.28 3.94 2.25-24.18Z'
          style={{
            fill: '#f1f1f3',
          }}
        />
      </g>
      <path
        d='M1512.37 638.28c.04-.39 3.83-39.17 7.14-53.2 4.18-17.7 9.9-27.57 10.14-27.98l1.96 1.15c-.06.1-5.79 10.01-9.89 27.35-3.28 13.87-7.06 52.5-7.09 52.89l-2.26-.22Z'
        style={{
          fill: '#f1f1f3',
        }}
      />
      <path
        d='M1513.13 642.03a1.978 1.978 0 0 1-1.72-2.15l1.85-18.74c.11-1.09 2.03-.31 2.03-.31s2.01-.37 1.9.7l-1.85 18.74a1.968 1.968 0 0 1-2.16 1.77h-.05ZM1556.75 628.16c.01-.39-.08-45.92-1.61-60.25-1.94-18.09-6.37-28.59-6.56-29.03l-2.09.89c.05.1 4.49 10.66 6.39 28.38 1.52 14.17 1.61 59.55 1.6 59.94l2.27.06Z'
        style={{
          fill: '#f1f1f3',
        }}
      />
      <path
        d='M1556.02 631.78c1.07-.05 1.9-.94 1.88-2.01l-.37-18.82c-.02-1.09-2-.47-2-.47s-1.97-.53-1.95.55l.37 18.82c.02 1.09.92 1.96 2.01 1.94h.05Z'
        style={{
          fill: '#f1f1f3',
        }}
      />
      <path
        d='M1598.35 395.6s12.01 50.58 13.2 57.27 8.32 22.13 8.32 22.13l31.11-13.9s-2.95-13.06-5.1-24.07c-2.15-11-10.7-55.78-10.7-55.78l-36.83 14.35Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1629.92 445.58c-10.27 3.85-19.61 6.7-15.31 27.27 4.31 20.57 17.94 65.77 18.42 73.66s-.96 14.83-.96 14.83l20.81 2.39s2.39-.96 2.39-6.94-1.2-10.52-.96-22 3.59-53.33 1.2-66.73c-2.39-13.39-10.28-28.22-25.59-22.48Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1634.13 555.72s-13.46 19.5-14.45 24.12c-.98 4.63-2.52 20.06-3.51 24.82-.98 4.77-1.26 8.98-1.26 8.98s6.59 3.23 10.1-4.63c3.51-7.85 2.66-17.95 6.45-17.25s.14 12.06-1.82 15.99c-1.96 3.93-7.43 4.63-7.85 6.59-.42 1.96-1.4 3.51-1.4 3.51s-7.85 2.81-8.42 5.61 0 5.89 0 5.89 26.23-5.33 28.19-7.29 12.48-20.48 13.89-23.84c1.4-3.37 1.12-23 1.26-29.73.14-6.73 1.26-8.56.98-12.9-.28-4.35-2.95-23.84-2.95-23.84l-20.76 2.81s5.05 12.48 1.54 21.18ZM1428.67 413.95s1.61 43.77-.3 53.37c-2.6 13.09-2.97 29.06 8.6 30.54 11.56 1.48 19.83-.66 23.39-12.23 3.56-11.56 7.15-36.1 7.44-46.78.3-10.67-2.67-33.21-2.67-33.21l-36.47 8.3Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1445.57 456.35c-15.41 1.24-19.87 10.08-23.13 31.13-3.26 21.05 3.26 76.79 2.67 82.72-.59 5.93-1.19 10.08-.89 16.01.3 5.93 1.19 11.27 1.19 11.27l19.87-8.89s-2.08-7.12.59-18.98 13.64-61.08 16.9-74.42c3.26-13.34 1.19-40.32-17.2-38.84Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1423.04 628.32c1.12 4.09 8.01 18.68 9.78 21.94 1.78 3.26 26.12 8.16 26.12 8.16s1.54-4.31-.22-5.92c-2.44-2.24-3.5-2.16-3.5-2.16l5.57-.68s-.11-5.62-3.66-6.22c-3.56-.59-11.03-1.89-11.03-1.89s-4.04-6.12-4.98-12.34c-.85-5.62 3.85-9.78 5.93-3.26 2.08 6.52 3.62 13.1 5.4 14.88 1.78 1.78 8.65 2.17 8.65 2.17s-3.48-10.87-4.02-14.39c-.7-4.59.18-17.28-1.63-22.8-1.81-5.52-9.87-16.38-10.53-20.51-1.11-6.97.54-15.83.54-15.83l-19.97 13.46s-.51 8.95-.1 15.55c.37 6.06-3.27 26.47-2.35 29.84Z'
        style={{
          fill: '#d4a55e',
        }}
      />
      <path
        d='M1489.71 304.7s2.26 5.8 11.92 18.69c9.67 12.89 25.13 26.08 25.13 26.08s18.24-18.63 24.68-27.65c6.44-9.02 7.86-24.21 7.86-24.21s29 10.63 39.63 14.82c10.63 4.19 23.84 9.34 26.1 14.5 2.26 5.16-16.11 38.34-17.08 52.2-.97 13.86 3.22 73.79 2.9 87.96-.32 14.18 5.48 62.19 8.38 78.94 2.9 16.76 1.84 22.99 1.84 22.99s-56.26 9.44-92.02 12.02c-35.77 2.58-70.92-4.9-70.92-4.9s5.48-34.3 9.02-54.6c3.54-20.3 4.51-67.34 3.87-78.62-.64-11.28-11.28-59.61-18.37-77.33-7.09-17.72-25.62-20.45-15.79-29.32 5.27-4.75 19.01-13.21 28.03-17.72 9.02-4.51 24.81-13.86 24.81-13.86Z'
        style={{
          fill: '#feca1b',
        }}
      />
      <g
        style={{
          clipPath: 'url(#i)',
        }}
      >
        <path
          d='M1474.88 291.94s10.16 24.36 21.43 37.89c11.28 13.53 30.37 29.9 30.37 29.9s22.56-22.69 30.62-33.01c8.06-10.31 12.17-42.74 12.17-42.74l-82.21 3.72-12.38 4.23Z'
          style={{
            fill: '#f8f7f0',
          }}
        />
      </g>
      <path
        d='M1412.41 442.83s9.64 6.33 24.57 7.57c17.66 1.47 32.46-1.12 32.46-1.12s9.63-83.04 8.67-100.11c-.97-17.08-36.21-18.7-42.66-11.29-6.44 7.41-13.64 56.29-14.93 66.6-1.29 10.31-8.11 38.36-8.11 38.36ZM1601.52 433.26s25.78-6.44 38.67-7.41c12.89-.97 23.2-5.48 23.2-5.48s-32.54-91.51-40.28-96.99c-7.73-5.48-31.9-13.85-31.9-13.85s-.64 55.42.32 69.6c.97 14.18 9.99 54.13 9.99 54.13Z'
        style={{
          fill: '#feca1b',
        }}
      />
      <path
        d='M1493.31 300.81s-4.69 2.07 3.85 28.22c7.97 24.42 33.81 97.92 33.81 97.92l4.67-.31s19.22-73.64 24.83-96.92c6.57-27.27-1.41-33.25-1.41-33.25'
        style={{
          fill: 'none',
          stroke: '#272a3e',
          strokeLinecap: 'round',
          strokeMiterlimit: 10,
          strokeWidth: '1.68px',
        }}
      />
      <path
        style={{
          fill: '#8cabbc',
        }}
        d='m1527.94 429.59 3.1-.53.38-3.28 3.64-.13.72 3.01 3.57.29-1.5 19.09-7.57-.11-2.34-18.34z'
      />
      <path
        style={{
          fill: '#272a3e',
        }}
        d='M1530.96 441.75v1.71h6.5v-1.92l-6.5.21z'
      />
    </svg>
  )
}

export default GymTeacherStart
