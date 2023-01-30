import { Route, Routes } from 'react-router-dom'
import { Dash } from '../pages/dash'
import { Home } from '../pages/home'
import { Relatorio } from '../pages/relatório'
import { Teste } from '../pages/test'

interface Props {
  dataSignUp?: object
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teste" element={<Teste />} />
      <Route path="/dash/:city" element={<Dash />} />
      <Route path="/relat/:city" element={<Relatorio />} />
    </Routes>
  )
}
