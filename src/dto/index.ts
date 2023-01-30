/* eslint-disable camelcase */
export interface IUser {
  nome: string
  email: string
  matricula: number
  id: string
  token: string
  city: string
}

export interface IMaterial {
  id: string
  codigo: string
  descricao: string
  classificacao: string
  valor: string
  ged: string
  ft: string
  item: string
}

export interface IReqEpi {
  id: string
  user: IUser
  pushNotification: string
  item: IMaterial
  photo: string
  qnt: string
  data: string
  description: string
}
