import { useTranslations } from 'next-intl'

const Soccerfield = (props) => {
  const t = useTranslations()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='soccerfield-title'
      {...props}
    >
      <title id='soccerfield-title'>
        {t('antagonists.coach.components.background')}
      </title>
      <defs>
        <clipPath id='b'>
          <path
            style={{
              fill: 'none',
            }}
            d='M0 0h1920v1080H0z'
          />
        </clipPath>
        <clipPath id='c'>
          <path
            d='M1237.28 715.64c-19.76-7.38-40.45 3.46-46.61 21.97-6.17 18.54 1.38 38.33 21.08 46.07 20.45 8.03 40.42-3.86 47.07-21.96 6.3-17.15-2.39-38.92-21.54-46.08Z'
            style={{
              fill: '#ffd500',
            }}
          />
        </clipPath>
        <clipPath id='d'>
          <path
            d='M1262.67 722.98c-15.8 15.25-14.88 39.55-.27 53.64 14.65 14.11 36.63 15.89 52.73.85 16.71-15.61 14.5-39.7.48-54.06-13.29-13.61-37.64-15.2-52.95-.43Z'
            style={{
              fill: '#0095d8',
            }}
          />
        </clipPath>
        <style>
          {
            '.f{fill:none}.g{fill:#f6f6f7}.h{fill:#00487e}.i{fill:#0095d8}.j{fill:#f1f1f3}.k{fill:#ffd500}.l{fill:#2f8760}.m{fill:#b7d3ec}.n{fill:#cee0f2}.o{fill:#465256}.p{fill:#58a24b}.q{fill:#4a9986}.r{clip-path:url(#c)}.s{clip-path:url(#b)}.t{clip-path:url(#d)}'
          }
        </style>
      </defs>
      <g
        style={{
          clipPath: 'url(#b)',
        }}
        id='a'
      >
        <path
          style={{
            fill: '#b7d3ec',
          }}
          d='m2282.18 1163.15-2547.84 19.14 5.28-1285.15L2287.46-122l-5.28 1285.15z'
        />
        <path
          d='M1738.24 537.89s-167.53 0-238.82-25.39c-71.29-25.39-110.51-53.12-180.1-37.31-99.41 22.59-55.15 58.08-130.01 65-74.85 6.92-99.8 4.62-124.76 30-24.95 25.39-53.47 43.85-106.93 41.54-53.47-2.31-49.9-71.54-142.58-73.85-92.68-2.31-142.58 16.16-174.66 9.23-32.08-6.92-37.28-38.06-90.75-33.45-53.47 4.62-71.28 24.15-103.36 21.85-32.08-2.31-74.06-141.48-231.27-150.2-130.9-7.26-175.42 25.54-212.66 60.25-34.78 32.42-28.25 31.45-56.77 31.45-28.52 0-18.09-52.23-103.63-52.23s-117.63 23.08-142.58 18.46c-24.95-4.62-71.29-50.77-142.58-23.08-71.29 27.69-124.76 48.47-149.71 50.77-24.95 2.31-103.37-64.62-146.14-69.24-42.77-4.62-121.19 0-146.14-11.54-24.95-11.54-114.06-73.85-203.17-73.85-89.11 0-431.3 41.54-431.3 41.54l7.13 507.73 3475.34-6.92-224.56-320.8Z'
          style={{
            fill: '#cee0f2',
          }}
        />
        <path
          d='M2860.2 773.14s-97.77 0-139.37-26.01c-41.6-26.01-33.28-82.77-91.53-61.49-58.24 21.28-45.76 82.77-89.45 89.87-43.68 7.09-58.24 4.73-72.81 30.74-14.56 26.01-31.2 44.93-62.41 42.57-31.2-2.36-29.12-73.31-83.21-75.68-54.08-2.36-83.21 16.55-101.93 9.46-18.72-7.09-16.64-52.03-47.84-47.3-31.2 4.73-46.71 37.78-65.43 35.41-18.72-2.36 14.23-174.61-77.3-188.8-91.53-14.19-97.15-51.75-147.07-51.75-49.92 0-70.84 18.95-122.67 17.52-15.3-.42-70.01-26.69-120.59-16.49-49.37 9.96-80.14 41.32-94.7 43.69-14.56 2.36-41.15-15.86-110.06-10.55-25.33 1.95-79.73 36.33-173.46 38.67-99.38 2.48-116.12-49.27-276.48-32.05-25.72 2.76-91.39 34.39-201.52 48.45-100.24 12.8-1030.99 21.09-1030.99 21.09l-74.98 726.38 3314.86-265-131.05-328.73Z'
          style={{
            fill: '#4a9986',
          }}
        />
        <path
          d='M-309.55 668.61s354.05-11.71 515.49-9.37c161.44 2.34 393.53-10.37 574.07-7.03 76.5 1.42 777.79-36.09 855-40.77 77.21-4.68 546.4-4.68 546.4-4.68l9.36 1113.7S-89.34 1598.8-94.02 1587.1c-4.68-11.7-215.52-918.49-215.52-918.49Z'
          style={{
            fill: '#2f8760',
          }}
        />
        <path
          d='M1340.27 117.47s9.76-47.93 48.12-51.43c44.41-4.05 60.02 39.84 60.02 39.84s51.5 3.87 59.76 50.23c7.09 39.85-23.65 50.82-38.11 52.4-29.83 3.25-126.76 4.08-141.93.68-7.22-1.62-33.92-6.79-33.92-43.72 0-40.66 46.06-47.99 46.06-47.99'
          style={{
            fill: '#f6f6f7',
          }}
        />
        <path
          d='M1229.18 178.13s6.46-28.66 31.84-30.75c29.39-2.42 39.71 23.81 39.71 23.81s34.08 2.31 39.54 30.03c4.69 23.83-15.65 30.38-25.22 31.33-19.74 1.94-83.87 2.44-93.91.41-4.78-.97-22.44-4.06-22.44-26.14 0-24.31 30.47-28.69 30.47-28.69'
          style={{
            fill: '#f6f6f7',
          }}
        />
        <path
          id='ENVIRONMENT_BACKGROUND'
          style={{
            fill: '#58a24b',
          }}
          d='m-237.32 696.75 2413.39-6.28 23.04 758.07-2356.08-2.76-80.35-749.03z'
        />
        <path
          style={{
            fill: '#f1f1f3',
          }}
          d='m-62.33 814.54 2106.74-1.85 5.63 6.84-2113.58 2.93 1.21-7.92zm-258.28 85.44 977.19-3.37-141.3 508.49-10.41-3.82 140.51-496.51-975.72 3.49 9.73-8.28zM989.25 448.3l723.84 1.18-.36 4.67-725.89-.76 2.41-5.09zm0-20.66 723.84 1.18-.36 4.67-725.89-.76 2.41-5.09zm0 41.32 723.84 1.18-.36 4.67-725.89-.75 2.41-5.1zm0 20.66 723.84 1.18-.36 4.67-725.89-.75 2.41-5.1zm0 20.67 723.84 1.17-.36 4.67-725.89-.75 2.41-5.09zm0 20.66 723.84 1.17-.36 4.67-725.89-.75 2.41-5.09zm0 20.66 723.84 1.17-.36 4.67-725.89-.75 2.41-5.09zm0 20.66 723.84 1.17-.36 4.67-725.89-.75 2.41-5.09zm0 20.66 723.84 1.18-.36 4.66-725.89-.75 2.41-5.09zm0 20.66 723.84 1.18-.36 4.66-725.89-.75 2.41-5.09zm0 20.66 723.84 1.18-.36 4.67-725.89-.76 2.41-5.09zm0 20.66 723.84 1.18-.36 4.67-725.89-.76 2.41-5.09zm0 20.66 723.84 1.18-.36 4.67-725.89-.75 2.41-5.1zm0 20.66 723.84 1.18-.36 4.67-725.89-.75 2.41-5.1zm0 20.66 723.84 1.18-.36 4.67-725.89-.75 2.41-5.1zm-9.84 17.73 32.78 1.18-.01 4.67-32.88-.75.11-5.1z'
        />
        <path
          style={{
            fill: '#f1f1f3',
          }}
          d='m1285.82 413.65-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-41.42 0-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-20.72 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 325.06-4.67-.15.76-325.93 5.09 1.02zm579.9 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm20.72 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-41.43 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.66-.16.75-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm227.82 0-1.18 321.56-4.67-.16.76-322.42 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-186.4 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.76-306.46 5.09 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-20.71 0-1.18 305.6-4.67-.16.75-306.46 5.1 1.02zm-20.72 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02zm-20.71 0-1.17 305.6-4.67-.16.75-306.46 5.09 1.02z'
        />
        <path
          style={{
            fill: '#465256',
          }}
          d='m973.12 759.58 4.71-363.89 750.07-.78 2.14 358.18-19.51.55-1.77-340.62-709.9 3.28-5.28 343.62-20.46-.34z'
        />
        <path
          d='M1237.28 715.64c-19.76-7.38-40.45 3.46-46.61 21.97-6.17 18.54 1.38 38.33 21.08 46.07 20.45 8.03 40.42-3.86 47.07-21.96 6.3-17.15-2.39-38.92-21.54-46.08Z'
          style={{
            fill: '#ffd500',
          }}
        />
        <g
          style={{
            clipPath: 'url(#c)',
          }}
        >
          <path
            style={{
              fill: '#00487e',
            }}
            d='m1228.83 734.79-15.29 5.54.34 15.91 15.46 5.47 9.43-13.67-9.94-13.25zm-26.24 30.67c.01-.22-10.52-8.1-10.52-8.1l-4.81 13.28 6.01 6.42 12.85.51-3.52-12.11Zm35.06 9.79c-.21-.06-10.3 8.38-10.3 8.38l11.82 7.74 7.63-4.37 3.45-12.39-12.59.64Zm17.21-39.14-4.5 12.5 4.75 12.56 11.46-4.22-1.99-12.8-9.72-8.04zm-31.41-19.46 8.78-6.62 10.27 4.09 3.47 9.89-12.48-.89s-10.04-6.69-10.05-6.46Zm-16.02 5.21-4 11.53-10.74 8.92-5.56-12.01 6.5-7.96 13.8-.48z'
          />
        </g>
        <path
          style={{
            fill: '#465256',
          }}
          d='m988.25 753.31 39.68-32.91-31.15-318.83 6.93-.23 33.23 322.2-43.79 36.36-4.9-6.59zm727.24-6.34-37.02-27.49 32.99-319.33-6.94-.23-35.06 322.71 41.06 31 4.97-6.66z'
        />
        <path
          d='M1262.67 722.98c-15.8 15.25-14.88 39.55-.27 53.64 14.65 14.11 36.63 15.89 52.73.85 16.71-15.61 14.5-39.7.48-54.06-13.29-13.61-37.64-15.2-52.95-.43Z'
          style={{
            fill: '#0095d8',
          }}
        />
        <g
          style={{
            clipPath: 'url(#d)',
          }}
        >
          <path
            style={{
              fill: '#00487e',
            }}
            d='m1276.87 739.51-1.65 16.85 15.1 6.81 12.06-12.07-8.61-14.99-16.9 3.4zm17.04 38.4c-.2-.11-12.33 6.25-12.33 6.25l10.32 10.48 8.72-2.76 6.24-11.84-12.96-2.13Zm24.92-28.54c-.15.17 3.25 13.44 3.25 13.44l12.57-7.63-.68-9.12-10.09-8.8-5.05 12.12Zm-29.05-33.73 9.73 9.84 13.93 1.17 1.17-12.66-12.92-3.88-11.91 5.53zm-32.37 20.79-2.29-11.22 8.45-7.81 10.84 1.17-6.43 11.32s-10.79 6.43-10.58 6.54Zm-2.29 17.38 9.04 8.93 3.56 14.09-13.77-.16-4.57-9.68 5.74-13.18z'
          />
        </g>
      </g>
    </svg>
  )
}

export default Soccerfield