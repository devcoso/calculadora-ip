import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='md:h-screen'>
      <div className='h-1/6 flex flex-col justify-center my-3 md:my-0'>
        <h1 className=' from-sky-800 to-sky-600 font-bold text-7xl bg-clip-text text-transparent bg-gradient-to-br text-center'>Calculadora IP </h1>
      </div>
      <div className="flex flex-col md:flex-row h-5/6 mx-8 gap-5 items-center">
        <div className='w-1/2 bg-zinc-100 h-5/6 gap-3 shadow-lg'></div>
        <div className='w-1/2 bg-zinc-100 h-5/6 gap-3 shadow-lg'></div>
      </div>
    </div>
  )
}

export default App
