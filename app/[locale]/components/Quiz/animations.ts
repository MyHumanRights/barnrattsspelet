export const divVariants = {
  show: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
  hide: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.4,
    },
  },
  check: {
    padding: 0,
    margin: 0,
    transition: {
      margin: { delay: 0.7, duration: 0.2 },
      padding: { delay: 0.7, duration: 0.2 },
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
}

export const buttonVariants = {
  show: {
    y: 0,
    opacity: 1,
    height: 'auto',
  },
  hide: {
    y: -20,
    opacity: 0,
    height: '1px',
  },
  check: {
    y: 0,
    x: -40,
    opacity: 0,
    height: '1px',
    padding: 0,
    margin: 0,
    border: '0px',
    transition: {
      height: { delay: 0.7, duration: 0.2 },
      margin: { delay: 0.7, duration: 0.2 },
      padding: { delay: 0.7, duration: 0.2 },
      border: { delay: 0.7, duration: 0.2 },
    },
  },
}
