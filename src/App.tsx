import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-green-900 text-white">
      <h1 className="text-2xl font-bold">Интерфейс инкассатора</h1>
      <div className="space-x-4">
        <Link to="/chat/sppous" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">Чат СППОУС</Link>
        <Link to="/chat/curus" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">Чат ЦУРУС</Link>
      </div>
      <Link to="/scanner" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">Сканировать QR</Link>
    </div>
  )
}
