/* eslint-disable array-callback-return */
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fire } from '../../config/firebase'
import { IReqEpi } from '../../dto'
import * as S from './styles'
import { CSVLink, CSVDownload } from 'react-csv'

export function Relatorio() {
  const { city } = useParams()
  const [data, setData] = useState<IReqEpi[]>([])

  const [seach, setSearch] = useState('')

  useEffect(() => {
    const coleS = collection(fire, 'entregue')
    onSnapshot(coleS, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IReqEpi
      })

      setData(
        rs
          .filter((p) => {
            if (p.user.city === city) {
              return p
            }
          })
          .sort((a, b) => {
            if (a.data < b.data) {
              return -1
            }
            return 1
          }),
      )
    })
  }, [city])

  const relat = data.map((h) => {
    const vl = h.item.valor.replace(/\D/g, '')
    console.log(vl)
    return {
      item: h.item.descricao,
      data: h.data,
      nome: h.user.nome,
      matricula: String(h.user.matricula),
      valor: Number(vl) / 100,
    }
  })

  const file = data.map((h) => {
    return {
      item: h.item.descricao,
      data: h.data,
      nome: h.user.nome,
      matricula: String(h.user.matricula),
      valor: h.item.valor,
    }
  })

  const fileCsv =
    seach !== ''
      ? file.filter((h) => {
          if (h.matricula.includes(seach)) {
            return h
          }
        })
      : file

  const rs =
    seach !== ''
      ? relat.filter((h) => {
          if (h.matricula.includes(seach)) {
            return h
          }
        })
      : relat

  const total = useMemo(() => {
    return rs.reduce((ac, i) => {
      return ac + Number(i.valor)
    }, 0)
  }, [rs])

  return (
    <S.container>
      <div className="flex flex-col md:flex-row  my-4 items-center">
        <div>
          <p>pesquisar por matrícula</p>
          <input
            onChange={(h) => setSearch(h.currentTarget.value)}
            type="text"
            className="p-2 text-gray-900"
          />
        </div>

        <div className="bg-orange-700 h-11 mt-6 items-center ml-4 justify-center flex w-60 rounded-sm ">
          <CSVLink data={fileCsv}>Download me</CSVLink>
        </div>

        <div className="ml-10">
          <h1 className="text-orange-400 font-bold">Total de itens</h1>
          <p>{rs.length}</p>
        </div>

        <div className="ml-10">
          <h1 className="text-orange-400 font-bold">Volor em R$</h1>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>
      <table>
        <tr>
          <th>Item</th>
          <th>Data</th>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Assinatura</th>
        </tr>

        {rs.map((h, i) => (
          <tr key={String(i)}>
            <td>{h.item}</td>
            <td>{h.data}</td>
            <td>{h.nome}</td>
            <td>{h.matricula}</td>
            <td></td>
          </tr>
        ))}
      </table>
    </S.container>
  )
}
