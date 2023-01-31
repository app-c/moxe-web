import React from 'react'
import * as S from './styles'

interface Props {
  text: string
  pres: () => void
  selected: boolean
}
export function Select({ text, pres, selected }: Props) {
  return (
    <S.container onClick={pres}>
      <S.circle>
        <S.dot selected={selected} />
      </S.circle>
      <h1>{text}</h1>
    </S.container>
  )
}
