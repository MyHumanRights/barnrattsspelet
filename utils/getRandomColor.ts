export const getRandomColor = (): string => {
  const colors = [
    '#EA6523',
    '#4B1F68',
    '#0090CF',
    '#12ACA3',
    '#f5b310',
    '#E60080',
    '#e42b48',
    '#008533',
    '#e95e29',
    '#221235',
    '#9b438f',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
