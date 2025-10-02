import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jsQR from 'jsqr'

export default function Scanner(){
  const videoRef = useRef<HTMLVideoElement|null>(null)
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  const [result, setResult] = useState<string|null>(null)
  const navigate = useNavigate()

  const startScan = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    if(videoRef.current){
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }
    tick()
  }

  const tick = () => {
    if(videoRef.current && canvasRef.current){
      const ctx = canvasRef.current.getContext('2d')
      if(ctx){
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = ctx.getImageData(0,0,canvasRef.current.width,canvasRef.current.height)
        const code = jsQR(imageData.data, canvasRef.current.width, canvasRef.current.height)
        if(code){
          setResult(code.data)
          alert("QR найден: " + code.data)
          navigate('/')
        } else {
          requestAnimationFrame(tick)
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-green-900 text-white h-screen">
      <h2 className="text-xl mb-4">Сканер QR</h2>
      <video ref={videoRef} className="w-full max-w-md border mb-4" />
      <canvas ref={canvasRef} className="hidden" />
      <button onClick={startScan} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Начать сканирование</button>
      <Link to="/" className="mt-4 underline">Назад</Link>
      {result && <p className="mt-2">Результат: {result}</p>}
    </div>
  )
}
