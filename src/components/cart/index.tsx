import { IReqEpi } from '../../dto'
import * as S from './styles'

interface Props {
  pres?: () => void
  item: IReqEpi
  showButton?: 'show' | 'none'
}

export function Cart({ pres, item, showButton = 'show' }: Props) {
  return (
    <S.container>
      <div
        key={item.id}
        className="flex-col flex bg-gray-400/80 mt-4 p-4 rounded-sm"
      >
        <p className="font-bold">
          Nome: <span className="font-normal">{item.user.nome}</span>
        </p>

        <p className="font-bold">
          Item: <span className="font-normal">{item.item.descricao}</span>
        </p>
        <p className="font-bold">
          Data: <span className="font-normal">{item.data}</span>
        </p>

        {showButton === 'show' && (
          <button
            onClick={pres}
            className="bg-orange-900 rounded-md mt-4 hover:opacity-80 p-1 text-gray-50 font-bold "
          >
            Entregar item
          </button>
        )}
      </div>
    </S.container>
  )
}
