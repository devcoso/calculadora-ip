import { useState, useEffect } from 'react'
//Components
import Ip from './components/Ip'
import Subred from './components/Subred'
import IP from './models/ip'


function App() {
  const [ip, setIp] = useState(new IP())

  return (
    <>
      <div className='md:h-screen'>
        <div className='md:h-1/6 flex flex-col justify-center my-10 md:my-0'>
          <h1 className='from-sky-800 to-sky-600 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-br text-center'>Calculadora IP </h1>
        </div>
        <div className="flex flex-col md:flex-row mx-3 h-5/6 md:mx-8 gap-5 items-center mb-8">
          <Ip ip={ip} setIp={setIp}/>
          <Subred ip={ip} setIp={setIp}/>
        </div>
      </div>
      <div className='p-6 bg-zinc-100 mt-20 text-center flex flex-col justify-center text-sky-600 font-bold'>
        <a href="">Guzmán Blanco José Armando</a>
        <a href="">Hernández SumayaLucas Melvin</a>
        <a href="https://www.github.com/devcoso" target='_blank'>Medina Paredes José David</a>
        <a href="https://github.com/PRdzSan">Rodríguez Sánchez Pablo</a>
        <p className='text-zinc-600'>&copy; {new Date().getFullYear()}</p>
      </div>
    </>
  )
}

export default App
