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
import { Select } from '../../components/select'
import React from 'react'

interface PropsSelect {
  type: 'pendente' | 'separado' | 'entregue'
}

export function Dash() {
  const { city } = useParams()
  const nav = useNavigate()
  const [dataPendent, setDataPendent] = useState<IReqEpi[]>([])
  const [dataSeparado, setDataSeparado] = useState<IReqEpi[]>([])
  const [dataEntregue, setDataEntregue] = useState<IReqEpi[]>([])

  const [select, setSelect] = React.useState<PropsSelect>({ type: 'pendente' })

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

  const handleSendSeparado = useCallback(async (item: IReqEpi) => {
    const colection = collection(fire, 'separado')
    const ref = doc(collection(fire, 'pendente'), item.id)

    // sendPush(item.pushNotification)

    const rs = {
      ...item,
      data: format(new Date(), 'dd/MM/yy - HH:mm'),
    }

    try {
      await addDoc(colection, rs)
      await deleteDoc(ref)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleSendEntregue = useCallback(async (item: IReqEpi) => {
    const colection = collection(fire, 'entregue')
    const ref = doc(collection(fire, 'separado'), item.id)

    const rs = {
      ...item,
      data: format(new Date(), 'dd/MM/yy - HH:mm'),
    }

    try {
      await addDoc(colection, rs)
      await deleteDoc(ref)
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
        <div className="flex flex-row items-center justify-between mb-2 ">
          <div>
            <p className="text-sm text-start">Buscar item pela matrícula</p>

            <input
              className="w-32 mt-1 mb-10 md:w-72 p-1 rounded-sm text-gray-900  sm:w-80 "
              type="text"
              onChange={(h) => setSearch(h.currentTarget.value)}
            />
          </div>

          <button
            onClick={handleNavitate}
            className="bg-orange-500 py-2 px-8 rounded-md"
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

        <S.mobile>
          <div className="w-9/12 flex justify-between">
            <Select
              text="pendente"
              pres={() => setSelect({ type: 'pendente' })}
              selected={select.type === 'pendente'}
            />

            <Select
              text="separado"
              pres={() => setSelect({ type: 'separado' })}
              selected={select.type === 'separado'}
            />

            <Select
              text="entregue"
              pres={() => setSelect({ type: 'entregue' })}
              selected={select.type === 'entregue'}
            />
          </div>

          {select.type === 'pendente' && (
            <S.boxScroll>
              {list.recevid.map((h) => (
                <Cart key={h.id} pres={() => handleSendSeparado(h)} item={h} />
              ))}
            </S.boxScroll>
          )}
          {select.type === 'separado' && (
            <S.boxScroll>
              {list.separada.map((h) => (
                <Cart key={h.id} pres={() => handleSendSeparado(h)} item={h} />
              ))}
            </S.boxScroll>
          )}
          {select.type === 'entregue' && (
            <S.boxScroll>
              {list.entregue.map((h) => (
                <Cart key={h.id} showButton="none" item={h} />
              ))}
            </S.boxScroll>
          )}
        </S.mobile>
      </S.container>
    </>
  )
}
