/* eslint-disable array-callback-return */
import { cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
import * as S from './styles'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { fire } from '../../config/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { IReqEpi } from '../../dto'
import { format } from 'date-fns'
import { Cart } from '../../components/cart'

export function Dash() {
  const { city } = useParams()
  const nav = useNavigate()
  const [dataPendent, setDataPendent] = useState<IReqEpi[]>([])
  const [dataSeparado, setDataSeparado] = useState<IReqEpi[]>([])
  const [dataEntregue, setDataEntregue] = useState<IReqEpi[]>([])

  const [search, setSearch] = useState('')

  const sendPush = useCallback(async (token: string) => {
    const message = {
      to: token,
      sound: 'default',
      title: 'SEU PEDIDO ESTÁ PRONTO',
      body: `Favor vim retirar seu item`,
    }
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }, [])

  const handleSendSeparado = useCallback(
    async (item: IReqEpi) => {
      const colection = collection(fire, 'separado')
      const ref = doc(colection, item.id)

      sendPush(item.pushNotification)

      const rs = {
        ...item,
        data: format(new Date(), 'dd/MM/yy - HH:mm'),
      }

      try {
        // deleteDoc(ref)
        addDoc(colection, rs)
      } catch (err) {
        console.log(err)
      }
    },
    [sendPush],
  )

  const handleSendEntregue = useCallback(async (item: IReqEpi) => {
    const colection = collection(fire, 'entregue')
    const ref = doc(colection, item.id)

    const rs = {
      ...item,
      data: format(new Date(), 'dd/MM/yy - HH:mm'),
    }

    try {
      deleteDoc(ref)
      addDoc(colection, rs)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleNavitate = useCallback(async () => {
    const li = JSON.stringify(dataEntregue)

    nav(`/relat/${city}`)
  }, [city, dataEntregue, nav])

  useEffect(() => {
    const coleP = collection(fire, 'pendente')
    const coleS = collection(fire, 'separado')
    const coleE = collection(fire, 'entregue')

    onSnapshot(coleP, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IReqEpi
      })

      setDataPendent(
        rs.filter((p) => {
          if (p.user.city === city) {
            return p
          }
        }),
      )
    })

    onSnapshot(coleS, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IReqEpi
      })

      setDataSeparado(
        rs.filter((p) => {
          if (p.user.city === city) {
            return p
          }
        }),
      )
    })

    onSnapshot(coleE, (h) => {
      const rs = h.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        } as IReqEpi
      })

      setDataEntregue(
        rs.filter((p) => {
          if (p.user.city === city) {
            return p
          }
        }),
      )
    })
  }, [city])

  const list = useMemo(() => {
    const recevid =
      search !== ''
        ? dataPendent
            .filter((h) => {
              if (String(h.user.matricula).includes(search)) {
                return h
              }
            })
            .sort((a, b) => {
              if (a.data < b.data) {
                return -1
              }
              return 1
            })
        : dataPendent.sort((a, b) => {
            if (a.data < b.data) {
              return -1
            }
            return 1
          })

    const separada =
      search !== ''
        ? dataSeparado
            .filter((h) => {
              if (String(h.user.matricula).includes(search)) {
                return h
              }
            })
            .sort((a, b) => {
              if (a.data < b.data) {
                return -1
              }
              return 1
            })
        : dataSeparado.sort((a, b) => {
            if (a.data < b.data) {
              return -1
            }
            return 1
          })

    const entregue =
      search !== ''
        ? dataEntregue
            .filter((h) => {
              if (String(h.user.matricula).includes(search)) {
                return h
              }
            })
            .sort((a, b) => {
              if (a.data < b.data) {
                return -1
              }
              return 1
            })
        : dataEntregue.sort((a, b) => {
            if (a.data < b.data) {
              return -1
            }
            return 1
          })

    return {
      recevid,
      separada,
      entregue,
    }
  }, [dataEntregue, dataPendent, dataSeparado, search])

  return (
    <>
      <S.container>
        <div className="flex flex-row items-center justify-between mb-4 ">
          <div>
            <p>Buscar item pela matrícula</p>

            <input
              className="w-80 mt- mb-10 p-1 rounded-sm text-gray-900 "
              type="text"
              onChange={(h) => setSearch(h.currentTarget.value)}
            />
          </div>

          <button
            onClick={handleNavitate}
            className="bg-orange-500 py-3 px-8 rounded-md"
          >
            Relatório
          </button>
        </div>
        <S.content>
          <div className="w-full ">
            <S.box border="pendent">
              <h1>Pedidos recebidos</h1>
            </S.box>

            <S.boxScroll>
              {list.recevid.map((h) => (
                <Cart key={h.id} pres={() => handleSendSeparado(h)} item={h} />
              ))}
            </S.boxScroll>
          </div>

          <div className="w-full ">
            <S.box border="espera">
              <h1>Pedidos separado para entrega</h1>
            </S.box>

            <S.boxScroll>
              {list.separada.map((h) => (
                <Cart key={h.id} item={h} pres={() => handleSendEntregue(h)} />
              ))}
            </S.boxScroll>
          </div>

          <div className="w-full ">
            <S.box border="entregue">
              <h1>Pedidos entregues</h1>
            </S.box>

            <S.boxScroll>
              {list.entregue.map((h) => (
                <Cart key={h.id} item={h} showButton="none" />
              ))}
            </S.boxScroll>
          </div>
        </S.content>
      </S.container>
    </>
  )
}
