import styled from 'styled-components'

interface PropsSelect {
  selected: boolean
}

export const container = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;
`

export const circle = styled.div`
  display: flex;

  width: 20px;
  height: 20px;

  border-radius: 10px;

  border: 1px solid #ffc445;

  align-items: center;
  justify-content: center;
  margin-right: 5px;
`

export const dot = styled.div<PropsSelect>`
  width: 10px;
  height: 10px;
  border-radius: 5px;

  background-color: ${(h) => (h.selected ? '#ffc445' : 'transparent')};
`
