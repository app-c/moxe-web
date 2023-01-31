import styled from 'styled-components'

export const container = styled.div`
  background-color: #202020;
  width: 100%;
  height: 100%;
  padding: 2rem;

  color: #fff;

  table {
    width: 80vw;
    @media (max-width: 650px) {
      width: 50vw;
    }
    border: 1px solid #fff;
    margin-top: 6rem;
    tr {
      text-align: start;
      border: 1px solid #fff;

      th {
        padding: 1rem;
        text-align: start;
        color: #ff9650;
      }

      td {
        padding: 1rem;
      }
    }
  }
`
