import React, {ReactNode} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap-v5'

type Props = {
  id: string
  children: ReactNode
  title: string
  className?: string
}

const CustomTooltip: React.FC<Props> = ({id, children, title, className}) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <span className={`custom-class ${className || ''}`}>{children}</span>
  </OverlayTrigger>
)

export default CustomTooltip
