import { useTranslations } from 'next-intl'

const TeacherStart = (props) => {
  const t = useTranslations()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1920 1080'
      role='image'
      aria-labelledby='teacher-before-title'
      fill='none'
      {...props}
    >
      <title id='teacher-before-title'>
        {t('antagonists.teacher.components.start')}
      </title>
      <defs>
        <clipPath id='teacher-b'>
          <path
            d='M1511.91 244.1c-29.66 5.94-22 24.83-45.74 45.78-23.74 20.95-30.49 74.73-1.17 99.87 29.33 25.14 41.02 15.95 75.93 11.76 34.91-4.19 80.06-15.92 80.28-53.73.32-53.68-36.68-60.39-47.85-79.94-11.17-19.55-27.33-30.57-61.45-23.74Z'
            style={{
              fill: '#6b562a',
            }}
          />
        </clipPath>
        <clipPath id='teacher-c'>
          <path
            d='M1577.4 372.46s-3.56 9.58-26.9 15.53c-21.43 5.47-38.54-9.16-38.54-9.16l-32.7 10.62s3.98 23.07 9.91 50.86c7.36 34.45 18.94 61.27 16.85 70.73-3.78 17.08-28.11 68.35-33.66 108-11.73 83.87-11.74 161.45-11.74 161.45s39.9 21.69 110.95 18.03c70.94-3.65 97.69-21.62 97.69-21.62s-.38-85.82-21.11-173.65c-10.16-43.05-49.51-90.3-44.25-116.73 2-10.02 5.16-24.87 2.22-60.45-3.2-38.66-7.82-52.36-7.82-52.36l-20.91-1.24Z'
            style={{
              fill: '#ef8227',
            }}
          />
        </clipPath>
        <style>
          {
            '.d{fill:none}.e{fill:#eb6a36}.f{fill:#ef821b}.g{fill:#ef8227}.h{fill:#f2c900}.i{fill:#6b562a}.j{fill:#6b5738}.k{fill:#d297bf}.l{fill:#dfbe84}.m{fill:#2a6196}.n{fill:#754734}.o{clip-path:url(#teacher-c)}.p{clip-path:url(#teacher-b)}'
          }
        </style>
      </defs>
      <path
        d='M1511.91 244.1c-29.66 5.94-22 24.83-45.74 45.78-23.74 20.95-30.49 74.73-1.17 99.87 29.33 25.14 41.02 15.95 75.93 11.76 34.91-4.19 80.06-15.92 80.28-53.73.32-53.68-36.68-60.39-47.85-79.94-11.17-19.55-27.33-30.57-61.45-23.74Z'
        style={{
          fill: '#6b562a',
        }}
      />
      <g
        style={{
          clipPath: 'url(#teacher-b)',
        }}
      >
        <path
          d='M1516.41 237.49s5.9 18.38 8.01 30.27c2.12 11.9 2.04 17.41 2.04 17.41l3.17-.17s-1.65-8.56-3.43-20.07c-1.78-11.51-8.62-29.58-8.62-29.58l-1.17 2.13Z'
          style={{
            fill: '#dfbe84',
          }}
        />
      </g>
      <path
        d='m1491.43 399.27 51.07 24.03 53.07-35.05 1.52-10.59s-9.53-1.42-22.55-6.43-21.03-37.05-21.03-37.05l-34.69 7.37s10.74 30.96-8.67 37.92c-11.53 4.14-19.72 7.78-19.72 7.78l1 12.02Z'
        style={{
          fill: '#dfbe84',
        }}
      />
      <path
        d='M1477.16 1009.66c-8.04-.39-21.43 1.49-24.17-8.89-2.32-8.8-1.25-20.18-2.82-39.08-1.16-14.06 2.43-32.04 18.36-30.73 15.93 1.32 12.46 20.11 15.36 37.85 2.91 17.74 10.73 28.03 9.23 34.77-1.28 5.77-8.08 6.45-15.97 6.07Z'
        style={{
          fill: '#754734',
        }}
      />
      <path
        d='M1483.46 686.09s-5.06 58.59-10.98 78.96c-5.92 20.37-20.62 37.61-20.81 64.1-.18 24.25 8.59 88.63 4.9 105.07 0 0-1.93 7.98-2.1 21.85-.11 9.05.14 31.7 17.09 27.74 16.15-3.77 5.17-32.88 11.24-60.98 4.36-20.16 19.1-81.15 19.1-81.15l18.06-120.76-36.5-34.83Z'
        style={{
          fill: '#eb6a36',
        }}
      />
      <path
        d='M1633.72 1009.14c8.01-.76 21.47.48 23.72-10.01 1.91-8.9-2.88-19.57-2.21-38.53.5-14.1-3.93-31.9-19.78-29.83-15.85 2.06-11.5 20.68-13.57 38.53-2.07 17.85-6.21 27.86-4.4 34.53 1.55 5.7 8.37 6.07 16.24 5.32Z'
        style={{
          fill: '#754734',
        }}
      />
      <path
        d='M1646.41 686.03s-.02 58.81 4.12 79.61c4.14 20.8 17.34 44.77 15.25 71.18-1.91 24.18-13.3 59.78-15.6 75.88-2.4 16.82-.32 28.63.5 42.49.53 9.04 1.35 31.67-15.77 28.51-16.3-3.01-7.81-36.15-8.35-64.89-.41-21.76-9.74-81.01-9.74-81.01l-13.21-119.35 42.8-32.42Z'
        style={{
          fill: '#eb6a36',
        }}
      />
      <path
        d='M1577.4 372.46s-3.56 9.58-26.9 15.53c-21.43 5.47-38.54-9.16-38.54-9.16l-32.7 10.62s3.98 23.07 9.91 50.86c7.36 34.45 18.94 61.27 16.85 70.73-3.78 17.08-28.11 68.35-33.66 108-11.73 83.87-11.74 161.45-11.74 161.45s39.9 21.69 110.95 18.03c70.94-3.65 97.69-21.62 97.69-21.62s-.38-85.82-21.11-173.65c-10.16-43.05-49.51-90.3-44.25-116.73 2-10.02 5.16-24.87 2.22-60.45-3.2-38.66-7.82-52.36-7.82-52.36l-20.91-1.24Z'
        style={{
          fill: '#ef8227',
        }}
      />
      <g
        style={{
          clipPath: 'url(#teacher-c)',
        }}
      >
        <path
          d='M1569.56 282.89c55.38-20.57 117.87.39 140.99 57.7 21.56 53.43.06 122.03-65.2 147.83-65.24 25.81-122.47-17.83-138.84-66.11-16.35-48.28 1.41-116.55 63.04-139.43Z'
          style={{
            fill: 'none',
          }}
        />
        <path
          d='M1545.51 395.99c21.51-1.96 31.62-11.71 36.28-16.36 4.66-4.66 8.88-17.62 8.88-17.62l-20.95-12.1-62.38 18.16-6.05 9.78s8.38 21.41 44.22 18.16Z'
          style={{
            fill: '#f2c900',
          }}
        />
      </g>
      <path
        d='M1542.15 358c13.11-3.58 22.84-23.62 26.02-30.76 3.18-7.14 4.86-20.24-5.9-27.92-17.87-12.77-23.92-23.61-35.03-22.02-11.11 1.59-10 10.81-21.78 24.32-8.43 9.67-9.01 26.54 1.31 36.06 10.32 9.53 26.65 22.7 35.39 20.32Z'
        style={{
          fill: '#dfbe84',
        }}
      />
      <path
        d='M1541.55 329.32c4.63-.53 7.21 4.67 7.37 6.92.2 2.86-3.76 7.72-9.85 8.97-3.94.81-9.37-1.38-12.13-5.1-1.49-2.01.47-6.23 3.12-8.42 2.65-2.19 5.14-1.02 6.22-1.02 2.25 0 2.03-.98 5.27-1.36Zm-3.79 5.53c-3.39.43-5.22.72-5.16 2.49.06 1.77 4 2.69 6.06 2.08 1.76-.52 4.91-.7 4.75-3.18-.05-.85-2.55-1.79-5.65-1.39Z'
        style={{
          fill: '#d297bf',
        }}
      />
      <path
        d='M1542.82 302.27c.43-.26 1.06-.45 1.73-.51l.83-3.32 1.15.07-.72 3.39c.37.11.73.32 1.08.61l3.49-2.29.73.8-3.2 2.74c.13.24.33.49.4.73l6.68-1.84.32 1.09-6.92 1.86c-.04 1.18-.6 2.29-1.49 3.07-1.32 1.15-3.69 1.27-5.07-.57-1.84-2.45-.48-4.97.99-5.83ZM1515.78 305.6c-.49-.13-1.16-.16-1.83-.04l-1.73-2.98-1.1.36 1.64 3.08c-.33.2-.62.5-.89.87l-4.03-1.29-.48.96 3.87 1.81c-.06.27-.18.55-.18.81l-7.18 1.34v1.14l7.41-1.39c.37 1.13 1.22 2.05 2.31 2.57 1.61.76 3.94.26 4.77-1.87 1.11-2.84-.91-4.91-2.58-5.36Z'
        style={{
          fill: '#2a6196',
        }}
      />
      <path
        d='M1520.06 302.54s-7.09-2.43-10.88-2.08c-3.79.34-8.19.75-8.19.75l.19-1.75s7.53-2.69 11.41-2 8.48 1.66 8.48 1.66l-1.01 3.42ZM1537.24 298.97c.27-.15 6.59-3.45 11.47-4.79 3.69-1.01 6.91-.48 6.91-.48l-.55-1.68s-7.02-2.3-10.67-.81c-3.65 1.48-8.86 4.62-8.86 4.62l1.7 3.14Z'
        style={{
          fill: '#6b5738',
        }}
      />
      <path
        d='M1479.26 389.45c-7.43 1.78-15.58 5.17-18.61 21.8-3.02 16.64-8.6 94.42-3.82 103.99 5.47 10.94 14.73 31.79 28.24 25.84 8.54-3.76 13.06-22.53 18.19-50.73 2.87-15.79 10.05-44.51 10.05-44.51l-18.29-51.09-15.76-5.31Z'
        style={{
          fill: '#ef821b',
        }}
      />
      <path
        d='M1622.4 562.95c-1.04-2.01 4.32-9.84 6.12-14.46 1.52-3.9 3.36-11.52 4.54-15.46.62-2.06 22.81-12.21 38.32-23.26l-18.04-16.5c-.62.62-7.17 6.35-12.75 10.75-10.33 8.14-19.55 12.18-23.6 17.82-4.05 5.64-13.22 24.29-15.27 30.11-.69 1.96 3.09 19.72 5.79 21.76 2.95 2.23 14.6-2.12 16.57-3.36 2.9-1.83 10.26-8.04 10.26-8.04s-2.49-2.41-5.65-2.3c-3.28.11-5.29 4.88-6.29 2.94ZM1474.84 490.54s-7.94-23.72-13.65-37.59c-5.71-13.87-19.45-38.89-20.23-42.57-1.24-5.78-3.55-17.46-7.34-22.62-1.94-2.64-7.85-7.42-12.16-10.96-4.72-3.87-8.02-7.63-9.15-8.83-3.55-3.79-13.24-13.69-16.72-16.26-3.33-2.46-6.05.82-6.05.82s10.65 12.32 12.25 14.27c2.53 3.07 8.26 9.03 10.08 11.72.53.79 0 1.73-.78 1.31-1.88-1.01-7.17-5.74-8.55-6.61-1.38-.88-2.72 1.07-4.03 2.92-1.03 1.45.65 4.33 0 5.61-.65 1.28-2.17 4.16-2.1 6.07.07 1.91 2.91 5.02 2.26 6.29-.65 1.28-1.03 4.06-.74 5.86.29 1.81 2.68 5.12 9.45 10.97 6.77 5.84 13.82 10.2 15.81 12.48 4.41 5.06 14.15 34.29 20.08 51.08 5.73 16.23 12.14 30.37 12.14 30.37l19.36-13.42s.61-.94.04-.91Z'
        style={{
          fill: '#dfbe84',
        }}
      />
      <path
        d='M1621.92 382.01c-17.99-11.59-34.98-8.83-34.98-8.83l4.34 60.45s16.68-4.23 30.29 4.85c13.61 9.07 53.32 31.69 52.5 34.48-1.06 3.58-10.66 11.24-22.97 22.44 0 0 2 4.38 5.66 10.62 3.67 6.24 9.2 8.85 9.2 8.85 6.78-4.34 26.16-17.16 31.98-22.33 7.24-6.44 18.18-15.74 15.84-23.35-1.28-4.15-22.22-29.32-46.42-50.43-17.9-15.61-37.65-31.74-45.44-36.76Z'
        style={{
          fill: '#ef821b',
        }}
      />
      <path
        d='M1434.28 454.11s16.94 52.96 23.34 63.93c5.67 9.73 15.77 20.16 24.31 14.99 8.55-5.17 11.11-14.8 10.13-27.96s-32.82-62.81-32.82-62.81-5.73 4.76-10.86 7.25-14.1 4.61-14.1 4.61Z'
        style={{
          fill: '#ef8227',
        }}
      />
    </svg>
  )
}

export default TeacherStart
