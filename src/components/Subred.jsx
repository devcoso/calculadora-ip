import { useEffect, useState } from "react"

import IP from "../models/ip"


export default function Subred({ip, setIp}) {
    const [typeMask, setTypeMask] = useState(0)
    const [valueMask, setValueMask] = useState(24)

    function handleCrearSubredes(e) {
        e.preventDefault()
        console.log('crear subredes', valueMask)
    }

    useEffect(() => {
        setValueMask(parseInt(ip.getMaskBinary()))
     }
    , [ip])

  return (
    <div className='w-full md:w-1/2 bg-zinc-100 md:h-full gap-3 shadow-lg p-10 space-y-3'>
        <p htmlFor='ip' className='text-sky-600 font-bold text-lg md:text-xl lg:text-2xl text-center'>Crea subredes</p>
        <form onSubmit={e => handleCrearSubredes(e)} className="space-y-3">
            <div className="space-y-1">
                <label htmlFor="mascara" className='text-sky-600 font-bold text-lg md:text-xl lg:text-2xl text-center block'>Máscara de las subredes</label>
                <div className='flex justify-around bg-white'>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 0 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`} onClick={() => setTypeMask(0)}>bits</p>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 1 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`}  onClick={() => setTypeMask(1)}>decimal</p>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 2 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`}  onClick={() => setTypeMask(2)}>hexadecimal</p>
                </div>
                <select className="m-auto block text-base md:text-lg text-center" id="mascara" value={valueMask} onChange={e => setValueMask(e.target.value)}>
                    {Array.from({length: 33 - parseInt(ip.getMaskBinary())}, (_, i) => i  + parseInt(ip.getMaskBinary())).reverse().map((i) => <option key={"ipHosts" + i} value={i}>{IP.mostrarTypeMask(i, typeMask)}</option>)}
                </select>
            </div>
            <div className="flex justify-between w-full sm:w-2/3 md:w-full lg:w-2/3 m-auto"> 
                <div>
                    <label htmlFor="mascara" className='text-sky-600 font-bold text-sm md:text-base text-center'>Host por subred</label>
                    <select className="m-auto block text-base md:text-lg text-center" id="mascara" value={valueMask} onChange={e => setValueMask(e.target.value)}>
                        {Array.from({length: 33 - parseInt(ip.getMaskBinary())}, (_, i) => i  + parseInt(ip.getMaskBinary())).map((i) => <option key={"ipHosts" + i} value={i}>{(2**(32 - i)-2 > 0) ? Intl.NumberFormat('en-US').format(2**(32 - i)-2) : 0 }</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="mascara" className='text-sky-600 font-bold text-sm md:text-base text-center'>Subredes</label>
                    <select className="m-auto block text-base md:text-lg text-center" id="mascara" value={valueMask} onChange={e => setValueMask(e.target.value)}>
                        {Array.from({length: 33 - parseInt(ip.getMaskBinary())}, (_, i) => i  + parseInt(ip.getMaskBinary())).reverse().map((i) => <option key={"ipHosts" + i} value={i}>{Intl.NumberFormat('en-US').format(2**(i - ip.getMaskBinary()))}</option>)}
                    </select>
                </div>
            </div>
            <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-auto block w-full md:w-2/3 lg:w-1/2">
                Calcular Subredes
            </button>
        </form>
    </div>
  )
}
