import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Chat(){
  const { id } = useParams()
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if(input.trim() === "") return
    setMessages([...messages, input])
    setInput("")
  }

  return (
    <div className="flex flex-col h-screen bg-green-950 text-white">
      <div className="p-4 bg-green-800 flex justify-between">
        <h2 className="font-bold">Чат {id}</h2>
        <Link to="/" className="text-sm underline">Назад</Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="p-2 bg-green-700 rounded">{m}</div>
        ))}
      </div>
      <div className="p-4 flex space-x-2 bg-green-800">
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-2 rounded text-black" placeholder="Введите сообщение..." />
        <button onClick={sendMessage} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Отправить</button>
      </div>
    </div>
  )
}
