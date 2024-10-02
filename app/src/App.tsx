import { Routes, Route } from 'react-router-dom';
import Products from './pages/products/Products';
import Carts from './pages/carts/Carts';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/cart' element={<Carts />} />
    </Routes>
  )
}

export default App
