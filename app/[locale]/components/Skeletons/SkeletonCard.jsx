import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = ({ size }) => {
  const { width, height } = (() => {
    switch (size) {
      case 'xsmall':
        return {
          width: 75,
          height: 112.5,
        }
      case 'small':
        return {
          width: 150,
          height: 225,
        }
      case 'medium':
        return {
          width: 200,
          height: 300,
        }
      case 'large':
        return {
          width: 400,
          height: 600,
        }
      case 'appCard':
        return {
          width: 200,
          height: 300,
        }
      default:
        return {
          width: 200,
          height: 300,
        }
    }
  })()

  return <Skeleton width={width} height={height} />
}

export default SkeletonCard
