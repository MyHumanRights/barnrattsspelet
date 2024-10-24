import { useTranslations } from 'next-intl'

const LeagueStart = (props) => {
  const t = useTranslations()

  return (
    <svg
      role='image'
      aria-labelledby='league-start-title'
      viewBox='0 0 1920 1080'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='league-start-title'>
        {t('antagonists.league.components.start')}
      </title>
      <defs>
        <clipPath id='league-b'>
          <path
            d='M985.97 871.54c13.41 1.82 12.2 7.25 13.92 10.51 1.72 3.26 13.92 26.47 15.63 31 1.72 4.53 2.67 12.33 2.1 13.78-.57 1.45-10.68 3.99-21.73 3.63-11.06-.36-16.97-.18-20.59-1.81s.76-11.6.76-18.13-4-11.78-4.77-18.31c-.76-6.53-.95-10.15-.95-10.15s5.34-.91 6.1-3.26c.76-2.36 1.53-8.34 9.53-7.25Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id='league-c'>
          <path
            d='M881.3 869.9c9.52-.71 10.29 7.25 13.15 8.16s4 3.44 4.58 9.79c.57 6.34 4.58 27.19 3.62 31.54-.95 4.35-2.1 5.98-7.82 5.98s-25.17-.54-29.93-.54-5.72-5.08-5.34-11.42c.38-6.34 5.15-17.77 7.63-23.57s.76-9.25 2.86-12.69 4-6.71 11.25-7.25Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id='league-d'>
          <path
            d='M860.64 431.31s5.37 24.41 2.73 31.2-10.97 6.57-10.97 6.57l13.95 39.78 62.22-8.86-1.13-34.88s-18.58-2.03-22.33-10.2c-3.76-8.17-.06-21.61-.06-21.61l-44.4-2.01Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id='league-e'>
          <path
            d='M816.4 487.53s10.48 71.18 9.36 98.11c-1.13 26.93-4.95 33.6-9.67 57.55-4.17 21.15 5.35 34.95 5.35 34.95l4.04 16.08s44.22-1.87 72.96-4.86S966 672.03 966 672.03l-1.35-17.7s8.8-4.06 6.09-23.02c-6.99-48.95-20.32-145.37-25.08-152.43-6.2-9.21-28.67-18.19-28.67-18.19s-7.66 9.25-14.61 18.77c-6.95 9.52-13.27 24.92-13.27 24.92s-10.23-13.43-20.08-22.06c-9.85-8.63-19.67-19.51-19.67-19.51l-32.97 24.71h.01Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id='league-f'>
          <path
            d='M139.65 110.82c-8.23.8-30.57.8-35.73 36.9-5.15 36.11-14.1 54.84-2.76 66.71 11.34 11.87 15.28 26.88 15.28 26.88s9.18-1.8 15.36-16.23c6.19-14.44-9.17-44.11-4.53-64.75s8.77-34.56 13.41-33.53c4.64 1.03 17 11.52 25.78 29.23 8.78 17.71.22 30.74-.51 42.98-1.43 23.66 18.02 40.84 18.02 40.84s1.15-10.15 9.92-29.75-1.84-30.99-8.54-61.93c-6.7-30.95-19.39-39.94-45.7-37.37Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <clipPath id='league-g'>
          <path
            d='M152.18 202.81c-13.84 1.69-32.97-3.75-34.97-25.82s8.56-29.34 13.28-36.98c5.38-8.73 4.45-13.51 11.98-14.26s7.04 2.45 16.84 16.08c9.81 13.62 15.86 19.21 16.55 31.95.69 12.74-10.52 27.43-23.68 29.03Z'
            style={{
              fill: 'none',
            }}
          />
        </clipPath>
        <style>
          {
            '.h{fill:none}.i{fill:#f4d027}.j{fill:#e6f1e2}.k{fill:#fdd900}.l{fill:#e8af34}.m{fill:#ef8227}.n{fill:#ebc88b}.o{fill:#e2e6ea}.p{fill:#ea683e}.q{fill:#c48648}.r{fill:#ad5850}.s{fill:#c6a4c9}.t{fill:#e2a972}.u{fill:#e29b7b}.v{fill:#235a96}.w{fill:#a3853f}.x{fill:#54535e}.y{fill:#284f4f}.aa{fill:#3a4b36}.ab{fill:#272a3e}.ac{fill:#4f4e47}.ad{fill:#4f6a6a}.ae{clip-path:url(#league-c)}.af{clip-path:url(#league-b)}.ag{clip-path:url(#league-f)}.ah{clip-path:url(#league-e)}.ai{clip-path:url(#league-d)}.aj{clip-path:url(#league-g)}'
          }
        </style>
      </defs>
      <path
        d='m1344.48 792.81 158.43-3.33s2.31 15.54 9.79 26.1c7.49 10.55 14.41 46.64 17.28 70.51 2.88 23.87 5.68 78.67 3.37 108.09-2.31 29.42-1.4 71.79-.25 89.56 1.15 17.76 5.18 52.19 4.61 79.39-.57 27.2-14.17 64.39-14.17 64.39s-12.47 9.32-23.42 9.32-24.9-2.69-24.9-2.69-16.07-56.25-14.34-94c1.72-37.75-6.17-86.75-17.69-122.82-11.52-36.09-18.99-48.42-18.99-48.42s-12.36 29.63-21.02 52.38c-8.64 22.77-10.44 60.02-11.48 68.78-1.96 16.43-4.12 64.6-7.58 80.14-3.46 15.54-19.8 60.34-19.8 60.34s-27.26 2.41-33.6 1.85-14.11-5.2-14.11-5.2-8.29-46.27-11.16-69.59c-2.88-23.31 6.31-98.49 4.59-116.8-1.72-18.32-6.74-98.35-5-136.11 1.72-37.75 25.14-121 39.41-111.89h.03ZM1419.49 348c-10.83.38-14.85 9.57-23.4 12.05s-22.08-3.21-29.97 5.5c-7.89 8.71-5.12 15.34-8.42 20.33-3.28 4.97-12.26 4.06-16.87 18.38-4.47 13.91-1.12 16.72-.75 23.58.38 7.26-6.34 17.29-7.12 26.93-1.06 13.1 11.41 18.03 15.12 25.45 4.22 8.46 6.17 24.4 14.57 30.2 13.13 9.07 27.89 11.44 33.81 18.29 5.92 6.84 3.72 2.03 27.71 4.5 19.52 2.02 20.96-8.37 27.54-9.63s17.1-4.64 25.77-13.97c9.76-10.51 7.76-23.65 13.67-28.01 5.92-4.36 15.54-12.57 15.54-21.92s-7.74-18.97-7.84-24.89c-.15-8.57 5.64-13.44-.12-28.8-5.37-14.34-14.87-16.13-20.13-21.11-5.25-4.97.94-14.23-8.85-20.49-13.75-8.82-15.78-1.87-23.68-6.23-7.89-4.36-8.82-10.82-26.58-10.18Z'
        style={{
          fill: '#4f4e47',
        }}
      />
      <path
        d='M1387.9 479.04s6.61 27.86 5.34 41.11c-2.1 21.97-28.6 41.81-28.6 41.81l57.18 23.09 63.39-25.05s-30.53-18.85-35.07-36.44.21-39.87.21-39.87l-62.43-4.65h-.01Z'
        style={{
          fill: '#c48648',
        }}
      />
      <path
        d='M1375.21 466.31c0 14.54 9.1 30.23 17.46 39.36 8.39 9.13 16.29 15.85 32.57 14.36 12.55-1.15 21.61-6.46 26.58-13.82 6.7-9.91 20.96-29.26 18.1-46.04-1.65-9.68-11.52-23.36-15.41-31.32-6.27-12.86-9.2-20.09-33.22-19.07-21 .9-28.2 3.89-33.44 19.57-4.72 14.17-12.64 25.64-12.64 36.97Z'
        style={{
          fill: '#c48648',
        }}
      />
      <path
        d='M1415.59 481.31c4.17-1.12 5.89-.22 7.45-.32 1.71-.12 4.03-.99 8.57-.84 5.74.18 9.61 9.04 9.89 10.49.52 2.8-.85 5.22-2.1 6.59-3.44 3.75-5.77 6.02-14.56 6.52-8.27.47-14.44-2.63-16.53-6.36-1.62-2.88-3.39-3.31-2.93-6.24.5-3.19 6.05-8.74 10.2-9.86h.01Zm-.47 11.92c.35 1.21 4.24 1.32 8.77 1.32s8.8-1.15 8.36-2.65c-.35-1.21-3.02-4.18-8.92-3.68-8.09.68-8.42 4.25-8.21 5Z'
        style={{
          fill: '#ad5850',
        }}
      />
      <path
        d='M1380.14 453.18s-14.95-10.88-15.54 1.12c-.59 12 3.66 23.42 7.58 23.42 4.67 0 11.07-7.42 11.07-7.42l-3.11-17.1ZM1461.73 455.15s16.88-11.67 17.46.32c.59 12-3.66 23.42-7.58 23.42-4.67 0-11.07-7.42-11.07-7.42l1.18-16.31h.01Z'
        style={{
          fill: '#c48648',
        }}
      />
      <path
        d='M1401.32 447.94c-3.21.21-5.33 2.5-5 5.64.32 3.13 2.44 4.28 5.33 4.28 3.41 0 5.22-2.18 5.22-5.43 0-2.3-2.24-4.7-5.53-4.49h-.01Z'
        style={{
          fill: '#4f4e47',
        }}
      />
      <path
        style={{
          fill: '#4f4e47',
        }}
        d='m1394.52 449.51 13.93 1.05-.24-3.33-14.51-1.6.82 3.88zM1439.91 447.15c3.21.21 5.33 2.5 5 5.64-.32 3.13-2.44 4.28-5.33 4.28-3.41 0-5.22-2.18-5.22-5.43 0-2.3 2.24-4.7 5.53-4.49h.01Z'
      />
      <path
        style={{
          fill: '#4f4e47',
        }}
        d='m1448.11 447.37-14.1 2.14-.31-3.04 14.66-3.2-.25 4.1z'
      />
      <path
        d='M1432.22 445.56s2.53-4.83 7.68-5.95 13.17-.75 13.17-.75l-.19-2.62s-7.64-2.62-15.26-1.12c-3.97.78-9.15 6.55-9.15 6.55l3.77 3.9h-.01ZM1411.16 447.51s-3.81-4.3-8.96-5.43c-5.15-1.12-13.17-.75-13.17-.75l.19-2.62s7.64-2.62 15.26-1.12c3.97.78 9.15 6.55 9.15 6.55l-2.49 3.37h.01Z'
        style={{
          fill: '#3a4b36',
        }}
      />
      <path
        d='m1306.6 845.96 14.42 45.96s8.46-12.95 16.18-21.74c7.71-8.8 10.29-20.65 10.29-20.65s-3.9-1.24-11.97-7.23c-7.21-5.37-6.84-11.33-6.84-11.33l-22.08 14.98ZM1535.41 856.73l-16.82 40.49s-7.21-7.68-14.62-16.72-13.76-19.18-13.76-19.18 9.07-6.98 13.94-11.7c4.72-4.59 13.94-12.82 13.94-12.82l17.32 19.93Z'
        style={{
          fill: '#c48648',
        }}
      />
      <path
        d='M1585.4 752.18c-3.37-25.86-48.11-179.35-50.87-185.26-9.55-20.47-22.52-21.59-38.33-25.8-15.81-4.22-41.9-9.17-41.9-9.17s-14.72 10.42-31.1 11.08c-16.38.66-34.31-10.05-34.31-10.05s-25.89 7.65-43.62 12.14c-17.72 4.5-26.74 9.02-36.84 17.96-14.25 12.6-55.59 165.52-56.75 195.4-2.63 67.66 56.52 115.02 56.52 115.02s-1.03-.62 8.77-14.72c8.92-12.82 24.56-14.95 24.56-14.95s43.99 9.26 76.65 6.42c27.79-2.43 62.55-5.25 85.84-7.27 3.11 2.9 8.26 8.11 14.42 15.81 8.27 10.33 16.35 20.55 16.53 19.63 0 0 60.06-52.28 50.42-126.27v.03Z'
        style={{
          fill: '#f4d027',
        }}
      />
      <path
        d='M869.43 363.45c-16.06 4.54-25.8 16.83-26.74 28.03s-13.22 21.51-13.22 21.51-.27 2.9 5.19 2.24c1.87-.23 3.78-2.19 4.73.95.94 3.14-8.03 2.19-8.03 13.39s9.31 14.35 15.78 19.91c5.53 4.75 4.11 4.85 12.29 10.91 9.94 7.36 39.38-1.82 39.38-1.82s19.25-1.18 22.73-14.66c1-3.89 5.67-1.34 5.67-1.34s6.14-12.1 0-21.06-5.07-14.06-5.07-19.89 6.95-17.76-7.68-25.83c-14.64-8.07-36.71-14.7-45.03-12.34Z'
        style={{
          fill: '#e8af34',
        }}
      />
      <path
        d='M883.51 458.82c-19.62.46-49.28-6.93-50.14 3.67-1.22 15.03 9.81 37.61 6.86 20.11l87.3.15s11.8-17.4.77-27.8c-8.36-7.89-29.87 3.51-44.79 3.86Z'
        style={{
          fill: '#4f6a6a',
        }}
      />
      <path
        d='M854.84 426.02s-6.62-1.58-7.22 2.5c-.98 6.68 1.33 13.39 4.24 13.39s3.76-.67 3.76-.67 1.11 6.7 4.6 9.53c3.49 2.84 15.36 9.56 25.25 8.71s18.09-7.93 20.7-11.62c2.62-3.69 2.75-9.93 2.75-9.93s5.02.58 6.76-1.69c1.75-2.27 3.32-10.81.56-11.9-4.1-1.61-7.78 0-7.78 0s-5.94-9.61-9.72-14.72c-3.78-5.11-17.78-3.89-28.06-8.33-6.86-2.97-9.79 6.01-9.72 12.78.08 8.88-6.11 11.95-6.11 11.95h-.01ZM997.88 599.2s-13.28 29.08-12.02 35.62c1.75 9.09-.27 42.64-.87 45.2-1.84 7.83-10.55 19.03-10.55 19.03s-2.45-2.68-2.31-5.19c.25-4.36 2.32-6.53 3.61-9.33 1.25-2.72 1.37-7.69.59-11.7-.69-3.49-.28-11.44-4.05-11.32-1.6.05-1.02 11.41-2.72 14.77-1.7 3.37-5.93 4.56-5.93 4.56s-.73-17.39-1.71-20.44c-.97-3.05-1.62-7.81-.57-11.59s4.86-6.29 6.09-11.64c1.23-5.35 6.99-42.33 6.99-42.33l23.46 4.35ZM804.73 569.93s-13.03-44.78-18.74-48.21c-7.93-4.77-22.36-14.37-23.54-16.72-3.23-6.44-5.82-24.14-5.82-24.14s2.52-.54 3.65.18 1.8 3.43 1.8 3.43l.64-3.31s3.45-.38 4.53 2.3c1.07 2.68 1.54 8.66 3.92 11.3 2.38 2.64 9.05 11.66 12.54 7.83 2.29-2.51-5.99-7.05-7.36-10.56-1.37-3.52 1.21-5.56 1.21-5.56s10.04 6.47 13.89 9.16c2.63 1.84 6.89 4.01 9 7.32s1.43 7.82 4.59 12.31 18.21 40.57 18.21 40.57l-18.53 14.11Z'
        style={{
          fill: '#ebc88b',
        }}
      />
      <path
        d='M892.62 859.05s.19.84.49 2.25c1.1 5.11 3.7 17.62 4.06 23.73.46 7.79-3.19 19.48-3.19 19.48l-27.32-4.33s6.83-20.78 6.37-30.74c-.46-9.96-3.64-15.15-3.64-15.15l23.22 4.76Z'
        style={{
          fill: '#4f4e47',
        }}
      />
      <path
        d='M945.9 614.38s13.18 38.37 22.13 80.47c8.94 42.1 8.24 64.94 10.92 71.75 2.68 6.8 15.68 26.59 19.7 52.1s-1.32 57.63-1.32 57.63-3.58 5.53-13.86 6.38c-10.29.85-16.99-.85-16.99-.85s1.34-14.46-2.68-20.41-40.06-56.3-44.98-72.89c-4.92-16.58-19.86-81.47-22.1-79.35-2.24 2.13 2.68 38.27 1.34 67.61-1.34 29.34-4.47 56.98-3.58 68.04s3.13 27.64 3.13 27.64-7.6 1.28-16.55 2.13c-8.94.85-14.76 0-14.76 0s-13.97-10.21-18.44-23.39-10.92-46.1-15.39-64.81-5.07-64.89-6.86-86.15 5.37-97.8 5.37-97.8l114.93 11.91h-.01Z'
        style={{
          fill: '#284f4f',
        }}
      />
      <path
        d='M985.97 871.54c13.41 1.82 12.2 7.25 13.92 10.51 1.72 3.26 13.92 26.47 15.63 31 1.72 4.53 2.67 12.33 2.1 13.78-.57 1.45-10.68 3.99-21.73 3.63-11.06-.36-16.97-.18-20.59-1.81s.76-11.6.76-18.13-4-11.78-4.77-18.31c-.76-6.53-.95-10.15-.95-10.15s5.34-.91 6.1-3.26c.76-2.36 1.53-8.34 9.53-7.25Z'
        style={{
          fill: '#c6a4c9',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-b)',
        }}
      >
        <path
          d='M973.77 907.79s-1.14 9.25 5.53 10.51c6.67 1.27 13.15.54 19.64.73 6.48.18 12.77.36 14.11-1.45 1.33-1.81 4.77-7.07 4.77-7.07l6.48 15.95s-23.07 17.77-23.64 17.77-29.93-9.79-29.93-9.79l-2.67-14.68 5.72-11.96Z'
          style={{
            fill: '#e2e6ea',
          }}
        />
      </g>
      <path
        d='M881.3 869.9c9.52-.71 10.29 7.25 13.15 8.16s4 3.44 4.58 9.79c.57 6.34 4.58 27.19 3.62 31.54-.95 4.35-2.1 5.98-7.82 5.98s-25.17-.54-29.93-.54-5.72-5.08-5.34-11.42c.38-6.34 5.15-17.77 7.63-23.57s.76-9.25 2.86-12.69 4-6.71 11.25-7.25Z'
        style={{
          fill: '#c6a4c9',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-c)',
        }}
      >
        <path
          d='M904.18 905.25s-1.91 8.52-6.48 9.25c-4.58.73-24.78.54-30.69-.36-5.91-.91-8.58-8.34-8.58-8.34l-1.53 27.92 49.38 1.81 2.1-23.93-4.19-6.34h-.01Z'
          style={{
            fill: '#e2e6ea',
          }}
        />
      </g>
      <path
        d='M860.64 431.31s5.37 24.41 2.73 31.2-10.97 6.57-10.97 6.57l13.95 39.78 62.22-8.86-1.13-34.88s-18.58-2.03-22.33-10.2c-3.76-8.17-.06-21.61-.06-21.61l-44.4-2.01Z'
        style={{
          fill: '#ebc88b',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-d)',
        }}
      >
        <path
          d='M858.55 463.52s16.27 12.2 32.54 9.35c16.27-2.85 24.4-13.83 24.4-13.83l13.42-.41-47.18 69.95-38.64-55.31 15.46-9.76Z'
          style={{
            fill: '#fdd900',
          }}
        />
      </g>
      <path
        d='M877.37 437.65c2.37-1.41 2.9.02 4.22-.04 1.45-.07 1.44-1.93 4.83-.09 3.66 1.99 4.6 3.99 4.95 5.31.92 3.48-1.64 8.21-8.65 8.62-7.21.42-11.3-3.75-10.14-7.67.67-2.26 1.7-4.28 4.8-6.13Zm-.96 7.39c-.13 1 2.1 1.5 5.49 1.17 3.45-.34 6.01-.96 5.68-1.78-.26-.66-1.15-2.67-5.58-2.6-4.68.08-5.53 2.78-5.59 3.21Z'
        style={{
          fill: '#e29b7b',
        }}
      />
      <path
        d='M868.27 417.83c-2 .13-3.32 1.56-3.12 3.51s1.52 2.69 3.32 2.67c1.93-.03 3.25-1.36 3.25-3.38 0-1.43-1.39-2.93-3.45-2.8Z'
        style={{
          fill: '#235a96',
        }}
      />
      <path
        style={{
          fill: '#235a96',
        }}
        d='m861.71 419.54 8.27.63-1.46-2.39-6.8.55-.01 1.21zM891.79 416.29c2 .13 3.32 1.56 3.12 3.51s-1.38 2.7-3.32 2.67c-2.12-.03-3.43-1.06-3.25-3.38.11-1.43 1.39-2.93 3.45-2.8Z'
      />
      <path
        style={{
          fill: '#235a96',
        }}
        d='m897.89 417.24-7.32 1.43.87-2.28 6.25-.54.2 1.39z'
      />
      <path
        d='M888.2 417.41s3.22-2.32 6.43-3.02c3.21-.7 6.7-.2 6.7-.2v-1.77s-3.57-1.4-8.32-.47c-2.47.48-6.42 3.21-6.42 3.21l1.61 2.24ZM870.82 418.73s-2.87-1.8-6.08-2.49c-3.21-.7-6.43.57-6.43.57l-.15-1.47s3.54-2.77 8.3-1.84c2.47.48 5.91 3.13 5.91 3.13l-1.55 2.1Z'
        style={{
          fill: '#e8af34',
        }}
      />
      <path
        d='M816.4 487.53s10.48 71.18 9.36 98.11c-1.13 26.93-4.95 33.6-9.67 57.55-4.17 21.15 5.35 34.95 5.35 34.95l4.04 16.08s44.22-1.87 72.96-4.86S966 672.03 966 672.03l-1.35-17.7s8.8-4.06 6.09-23.02c-6.99-48.95-20.32-145.37-25.08-152.43-6.2-9.21-28.67-18.19-28.67-18.19s-7.66 9.25-14.61 18.77c-6.95 9.52-13.27 24.92-13.27 24.92s-10.23-13.43-20.08-22.06c-9.85-8.63-19.67-19.51-19.67-19.51l-32.97 24.71h.01Z'
        style={{
          fill: '#284f4f',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-e)',
        }}
      >
        <path
          d='M780.9 680.51s84.81-4.51 110.19-6.85c48.6-4.47 89.83-23.76 89.83-23.76l-.37 41.12s-164.67 33.82-164.67 31.15-34.97-41.67-34.97-41.67Z'
          style={{
            fill: '#4f6a6a',
          }}
        />
      </g>
      <path
        d='M927.1 483.79s18.12 89.78 22.27 108.51c4.15 18.74 4.35 48.64 4.35 48.64l34.41 1.55s.19-14.22 4.82-18.73 9.95-12.17 6.91-31c-3.03-18.83-41.09-111.34-52.88-121.7s-15.53-6.38-22.99-3.12c-7.98 3.49 3.11 15.86 3.11 15.86ZM835.91 470.07s-14.66 6.16-19.5 15.85c-5.28 10.56-7.02 92.08-5.56 92.03l35.84 6.89s10.78 4.85 5.39-44.18-16.17-70.59-16.17-70.59Z'
        style={{
          fill: '#284f4f',
        }}
      />
      <path
        style={{
          fill: '#c6a4c9',
        }}
        d='m899.83 512.34 1.63 32.27 38.39-2.93-1.94-29.94-38.08.6z'
      />
      <path
        d='m917.21 514.98-11.35.24.36 13.29s6.49-.34 6.49 3.67c0 3.1-6.52 2.59-6.52 2.59l.03 7.22s14.25.73 14.25-9.47c0-8.97-8.21-9.33-8.21-9.33l-.39-3.05 5.57-.21-.22-4.95h-.01ZM921.52 515.04l1.09 25.91s15.45.05 14.74-13.97c-.67-13.38-15.83-11.95-15.83-11.95Z'
        style={{
          fill: '#ea683e',
        }}
      />
      <path
        d='m785.05 521.83 19.24-12.48 9.86 13.11s12.59 4.89 16.37 12.09 33.22 68.98 33.22 68.98-40.3-3.8-47.49-11.38c-7.18-7.58-21.33-27.29-24.78-38.88-3.45-11.59-5.55-26.69-5.55-26.69l-.87-4.73v-.02Z'
        style={{
          fill: '#284f4f',
        }}
      />
      <path
        d='M833.13 471.52 849.11 460s16.72 19.33 23.41 24.16c6.69 4.83 13.42 10.22 13.42 10.22s13.59-10.31 16.44-14.91 14.61-18.77 14.61-18.77l14.25.04s3.72 1.49 1.11 8.92c-2.6 7.43-44.21 41.5-44.21 41.5l-55.02-38.15'
        style={{
          fill: '#4f6a6a',
        }}
      />
      <path
        d='m159.9 326.43-58.89 11.28s-22.55 78.3-10.65 134.05c11.9 55.75 18.79 60.76 17.54 77.67-1.25 16.91 3.13 59.51 7.52 81.44 4.38 21.93 16.28 50.11 16.28 50.11l32.58-3.13s-13.15-82.06-10.02-97.72c3.13-15.66 5.64-33.83 10.65-59.51 5.01-25.68-5.01-194.19-5.01-194.19Z'
        style={{
          fill: '#54535e',
        }}
      />
      <path
        d='M213.77 334.57s21.3 70.79 21.93 104.62-21.93 94.59-20.05 111.5c1.88 16.91-1.88 68.28-2.5 85.82-.63 17.54-8.15 44.48-8.15 44.48l-29.44-4.38s-5.64-53.24-5.64-74.54-.63-29.44-2.5-43.22c-1.88-13.78-15.66-209.22-15.66-209.22s65.77-16.91 62.02-15.03Z'
        style={{
          fill: '#54535e',
        }}
      />
      <path
        d='M144.55 672.45c-6.32.53-19.43 0-19.43 0s10.87 22.86 10.61 32.08c-.13 4.52-4.32 12.26-4.74 19.49-.44 7.54-2.25 13.86-2.25 13.86l11.2 4.58 7.89-2.34s6.02 6.69 15.02 8.66c13.06 2.86 35.03-2.1 35.03-2.1s.75-14.01-8.96-16.86c-10.8-3.16-13.96-11.33-18.17-24.5-4.22-13.17-6.59-39.25-6.59-39.25s-6.98 5.32-19.62 6.37Z'
        style={{
          fill: '#272a3e',
        }}
      />
      <path
        d='m169.7 657.38 20.01 1.58 1.58 13.96s3.95-13.7 11.85-14.22 10.53 1.58 10.53 1.58-8.94 26.63-6.05 32.95c2.9 6.32 3.41 17.88 11.31 21.84s14.22 1.84 16.86 6.59c2.64 4.74 2.9 13.96 2.9 13.96s-10.8 3.69-25.81 3.42c-15.02-.27-16.07-1.32-18.7-4.74-2.64-3.42-7.11-7.9-7.11-7.9s.53 5.79-.27 5.79-17.12.53-17.12.53-3.69-9.48 1.32-23.7c5.01-14.22 3.16-20.28 2.37-26.34-.79-6.06-3.69-25.28-3.69-25.28l.02-.02ZM84.43 429.65s-2.98 15.64-1.86 33.85c.86 14.12 1.86 28.25 1.86 28.25s11.3-4.26 52.97-9.78c41.68-5.52 53.76 1.14 79.22-1.7 19.08-2.12 33.61-6.74 33.61-6.74s-6.47-42.67-9.53-53.09c-3.06-10.42-10.42-28.19-10.42-28.19L84.43 429.63Z'
        style={{
          fill: '#272a3e',
        }}
      />
      <path
        d='M234.37 278.22s9.02 36.6 7.91 46.64c-1.12 10.04-15.34 21.77-15.34 21.77s-21.94-7.81-20.82-8.18.37-58 .37-58l27.89-2.23Z'
        style={{
          fill: '#e2a972',
        }}
      />
      <path
        d='M139.04 207.23c-26.6 1.21-41.91 10.32-54.53 17.68-8.13 4.74 6.62 36.6 6.62 50.82s-7.64 84.57-8.97 103.09c-1.33 18.52-2.01 63.31-2.01 63.31s62.25 1.96 99.3-3 68.9-24.76 68.9-24.76-21.21-44.18-27.82-70.64c-6.61-26.46-17.58-47.16-16.6-70.65.99-23.49 17.22-45.74 9.61-51.37-7.61-5.63-47.84-15.7-74.51-14.49Z'
        style={{
          fill: '#e6f1e2',
        }}
      />
      <path
        d='M204.41 220.38c-8.89 1.04-8.42 33.85-6.76 49.4 1.66 15.55.75 32.62.75 32.62s19.52.17 29.78 1.82c10.25 1.66 15.33-2 15.33-2s-4.18-30.45-14.44-55.26c-10.25-24.81-13.41-27.89-24.66-26.58Z'
        style={{
          fill: '#e6f1e2',
        }}
      />
      <path
        d='M66.19 297.08s1.25 42.75 5.44 51.27c4.19 8.52 24.3 2.45 32.96 1.37s-1.49-21.5-.68-32.6c.81-11.1 0-30.7-4.06-33.41-4.06-2.7-35.15.65-33.66 13.38Z'
        style={{
          fill: '#e2a972',
        }}
      />
      <path
        d='M71.63 317.05c-6.53 13.32-2.26 37.52 5.44 37.66s42.16 1.73 57.18.11 48.38-15.5 58.39-20.92c10.01-5.41 15.29-26.78 20.97-30.03s9.33-3.51 11.23-4.87c1.9-1.35 2.44-5.95 2.44-5.95s-14.74 4.73-17.72 6.36c-2.98 1.62-8.11 5.68-8.11 5.68s6.9-8.11 9.6-9.07 9.33-3.25 12.99-3.51c3.65-.27 4.33-4.73 4.33-4.73l-19.48.94s6.9-2.3 8.52-2.16 5.95.27 7.71-.41 1.9-4.19 1.9-4.19l-10.69-1.62-11.63 2.16s5.68-4.73 7.85-6.36c2.16-1.62.27-6.22.27-6.22s-15.83 8.79-17.18 10.42c-1.35 1.62-2.7 10.82-4.87 14.48s-10.28 17.72-15.7 20.29c-5.41 2.57-20.97 3.38-37.47 4.33-16.5.94-62.58-9.27-65.96-2.38h.02Z'
        style={{
          fill: '#e2a972',
        }}
      />
      <path
        d='M68.21 238.58c-3.89 7-7.47 70.65-7.47 70.65s16.17-8.68 25.42-4.38c9.26 4.3 22.82 5.63 22.82 5.63l-14.9-90.57s-20.92 9.75-25.88 18.69Z'
        style={{
          fill: '#e6f1e2',
        }}
      />
      <path
        d='m98.43 259.91 20.63-7.4s16.74-.91 20.37 2.47c3.63 3.37 6.23 17.78 9.22 21.02 2.98 3.24 30.75 18.04 42.69 20.5 11.94 2.47 21.15 2.47 26.73 6.1 5.58 3.63 24.4 7.43 24.4 22.36s-4.42 24.49-17.13 21.5c-12.72-2.98-26.86-3.12-43.08-15.83-16.22-12.72-30.36-28.55-35.16-30.62-4.8-2.08-9.47-.13-13.11-5.58-3.63-5.45-6.23-11.68-6.23-11.68l-2.08 2.59s-5.45-1.95-7.79-5.71-3.12-18.04-3.12-18.04-8.95 2.73-12.59 2.73-3.76-4.41-3.76-4.41v-.02ZM123.49 177.53s2.62 15.5 1.56 21.3c-1.05 5.8-8.98 12.25-8.98 12.25s3.27 17.15 33.48 14.69c27.97-2.27 29.39-16.33 29.39-16.33s-9.55-2.37-9.55-10.28.53-22.69.53-22.69-45.37 0-46.43 1.05v.02Z'
        style={{
          fill: '#e2a972',
        }}
      />
      <path
        d='M139.65 110.82c-8.23.8-30.57.8-35.73 36.9-5.15 36.11-14.1 54.84-2.76 66.71 11.34 11.87 15.28 26.88 15.28 26.88s9.18-1.8 15.36-16.23c6.19-14.44-9.17-44.11-4.53-64.75s8.77-34.56 13.41-33.53c4.64 1.03 17 11.52 25.78 29.23 8.78 17.71.22 30.74-.51 42.98-1.43 23.66 18.02 40.84 18.02 40.84s1.15-10.15 9.92-29.75-1.84-30.99-8.54-61.93c-6.7-30.95-19.39-39.94-45.7-37.37Z'
        style={{
          fill: '#272a3e',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-f)',
        }}
      >
        <path
          d='M133.07 96.28s7.67 11.67 8.5 20.37c.83 8.71-.14 13.62-.14 13.62l2.19.09s.95-8.29-.11-14.66c-1.06-6.37-6.48-18.59-6.48-18.59s-3.99-.52-3.96-.85Z'
          style={{
            fill: '#e2a972',
          }}
        />
      </g>
      <path
        d='M152.18 202.81c-13.84 1.69-32.97-3.75-34.97-25.82s8.56-29.34 13.28-36.98c5.38-8.73 4.45-13.51 11.98-14.26s7.04 2.45 16.84 16.08c9.81 13.62 15.86 19.21 16.55 31.95.69 12.74-10.52 27.43-23.68 29.03Z'
        style={{
          fill: '#e2a972',
        }}
      />
      <g
        style={{
          clipPath: 'url(#league-g)',
        }}
      >
        <path
          d='M141.25 150.13s-5.61-2.78-9.85-2.39c-4.86.46-5.11 1.19-5.11 1.19l.25 2.11s3.21-.07 5 .12c4.1.43 9.22 2.2 9.22 2.2s.76-3.42.51-3.23ZM153.39 148.66s3.81-2.66 7.43-3.54 6.73.74 6.73.74l-.08 2.56c-.11.04-2.59-.5-4.94.19-2.2.64-8.34 3.22-8.34 3.22s-1.09-3.33-.81-3.17Z'
          style={{
            fill: '#a3853f',
          }}
        />
      </g>
      <path
        d='M151.23 179.96c.98.19 2.54-1.33 5.98.54 3.45 1.86 4.3 4.5 3.94 5.4s-8.01 4.02-11.78 3.82c-3.77-.2-11.21-1.43-11.43-2.78s5.71-7.79 9.22-8.06c3.51-.27 3.93 1.04 4.09 1.08h-.02Z'
        style={{
          fill: '#ef8227',
        }}
      />
      <path
        d='m134.22 159.91-6.61-2.32 1.14-1.96 7.36 2.35s-1.75 2.02-1.88 1.94Z'
        style={{
          fill: '#2e425b',
        }}
      />
      <path
        style={{
          fill: '#2e425b',
        }}
        d='m135.69 158.41-.91-5.81 1.67-.33 1.01 5.25-1.77.89z'
      />
      <path
        d='M136.51 155.99c-2.01-.17-3.54 1.07-3.63 3.04s.85 3.35 2.64 3.61c2.11.31 3.57-1.09 3.88-3.12.22-1.43-.82-3.36-2.89-3.54ZM159.49 158.89l7.14-2.11-.7-2.2-7.76 2.42s1.19 1.96 1.33 1.9ZM158.57 156.79l1.45-5.46-1.55-.49-1.5 4.91 1.6 1.04z'
        style={{
          fill: '#2e425b',
        }}
      />
      <path
        d='M158.01 154.66c2.01.05 3.41 1.43 3.28 3.41-.12 1.97-1.51 2.95-3.32 3.02-2.14.08-3.13-1.19-3.22-3.22-.06-1.44 1.18-3.26 3.25-3.21Z'
        style={{
          fill: '#2e425b',
        }}
      />
    </svg>
  )
}

export default LeagueStart
