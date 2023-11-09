import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  [key: string]: any
}

const Portal =
  (Component: React.FC<PropsWithChildren<Props>>) => (props: Props) => {
    return createPortal(
      <Component {...props} />,
      document.getElementById('modal') as HTMLElement
    )
  }
export default Portal
