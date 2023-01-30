import { BrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Router } from './routes'

function App() {
  return (
    <BrowserRouter>
      <div className=" h-full bg-gray-800">
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App
