import React from 'react'
import './card.scss'

type CardProps = {
  type: 'wide' | 'square' | 'tall',
  width?: number | string,
  height?: number | string,
  innerLayout?: 'rowStart' | 'rowCenter' | 'rowEnd' | 'columnStart' | 'columnCenter' | 'columnEnd',
  children?: React.ReactNode
}

export const Card = ({type, width, height, innerLayout, children}: CardProps) => {
  return (
    <div className={`c-card c-card__type--${type} c-card__innerLayout--${innerLayout}`} style={{width: width, height: height}}>
      {children}
    </div>
  )
}