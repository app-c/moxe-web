import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'

interface PropsCity {
  city: 'BOTUCATU' | 'ARAÇATUBA' | 'escolha a cidade'
}

export function Home() {
  const [city, setCity] = useState<PropsCity>({ city: 'escolha a cidade' })
  const nav = useNavigate()

  const handleGoDash = useCallback(async () => {
    if (city.city === 'escolha a cidade') {
      return alert('Escolha uma cidade')
    }

    nav(`/dash/${city.city}`)
  }, [city.city, nav])

  console.log(city)
  return (
    <S.container>
      <select
        onChange={(h: any) => setCity({ city: h.currentTarget.value })}
        className="h-10 w-96 p-2 border-r-8"
      >
        <option>escolha a cidade</option>
        <option>BOTUCATU</option>
        <option>ARAÇATUBA</option>
      </select>

      <button
        onClick={handleGoDash}
        className="mt-10 hover:opacity-80 bg-orange-700 rounded p-3 "
      >
        CONTINUAR
      </button>
    </S.container>
  )
}
