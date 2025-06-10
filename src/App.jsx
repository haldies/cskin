
import { Routes, Route } from 'react-router-dom'


import HomePage from './Pages/HomePage'
import SkinTypePage from './Pages/SkinTypePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/skintype" element={<SkinTypePage/>} />
      {/* Optional: 404 Page */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  )
}
