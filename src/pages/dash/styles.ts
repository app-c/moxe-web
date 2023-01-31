import styled from 'styled-components'

type BorderColer = 'pendent' | 'espera' | 'entregue'

interface PropsBorder {
  border: BorderColer
}

const typesBorder = {
  pendent: '#cf2020',
  espera: '#fdf906',
  entregue: '#86e049',
}

const typeBackGround = {
  pendent: 'rgba(207, 32, 32, 0.1)',
  espera: 'rgba(255, 253, 108, 0.1)',
  entregue: 'rgba(133, 224, 73, 0.1)',
}

export const container = styled.div`
  display: flex;
  flex-direction: column;
  height: 110vh;
  width: 100vw;
  background-color: #1e2129;
  padding: 3rem;

  @media (max-width: 780px) {
    padding: 1rem;
  }

  color: #fff;
`

export const content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  /* grid-template-rows: 80vh; */
  grid-gap: 1rem 3rem;

  @media (max-width: 750px) {
    display: none;
  }
`

export const box = styled.div<PropsBorder>`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid;
  border-color: ${(h) => typesBorder[h.border]};
  background-color: ${(h) => typeBackGround[h.border]};

  border-radius: 5px;

  align-items: center;

  h1 {
    color: #ff9100;
    font-weight: 600;
  }
`

export const boxScroll = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  height: 40vw;

  @media (max-width: 780px) {
    height: 90vh;
  }
`

export const mobile = styled.div`
  display: none;
  flex-direction: column;

  @media (max-width: 750px) {
    display: flex;

    width: 100vw;
  }
`
