import { useEffect, useState } from "react"

import IP from "../models/ip"


export default function Subred({ip, setIp}) {
    const [typeMask, setTypeMask] = useState(0)
    const [valueMask, setValueMask] = useState(24)
    const [subredes, setSubredes] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    function handleCrearSubredes(e) {
        e.preventDefault()
        let newIP = new IP(ip.getIp(), ip.getMaskBinary())
        newIP.setSubMask(valueMask)
        setIp(newIP)
        setPage(0)
        generarSubredes(0, 256)
    }

    useEffect(() => {
        setValueMask(ip.getSubMask())
        setPage(0)
        setPages((2**(parseInt(ip.getSubMask()) - ip.getMaskBinary())) / 256)
        generarSubredes(0, 256)
    }, [ip])

    function generarSubredes(desde, hasta) {
        //Valores lógicos
        let subredes = []
        let subnetMask = parseInt(ip.getSubMask())
        let salto = 2**(32 - subnetMask)
        let numSubredes = 2**(subnetMask - ip.getMaskBinary())
        let octetoUltimo = Math.floor(ip.getMaskBinary() / 8)

        if(hasta > numSubredes) {
            hasta = numSubredes
        }

        //Empieza en la red indicada
        let octeto = 3
        let ipRed = ip.getRedArray()
        ipRed[octeto] = ipRed[octeto] + salto*desde
        while(octeto > octetoUltimo) {
            if(ipRed[octeto] > 255) {
                ipRed[octeto - 1] += Math.floor(ipRed[octeto] / 256)
                ipRed[octeto] = ipRed[octeto] % 256
                octeto--
            } else {
                break
            }
        }

        //Generar subredes
        for(let i = desde; i < hasta; i++) {
            let octeto = 3
            let newIP = new IP(ipRed, subnetMask)
            let subnet = {
                numero: i + 1,
                red: newIP.getRed(),
                hosts: newIP.getRangoHosts(),
                broadcast: newIP.getBroadcast()
            }
            subredes.push(subnet)
            //Sumar salto
            let suma = newIP.getRedArray()
            suma[octeto] = suma[octeto] + salto
            while(octeto > octetoUltimo) {
                if(suma[octeto] > 255) {
                    suma[octeto - 1] += Math.floor(suma[octeto] / 256)
                    suma[octeto] = suma[octeto] % 256
                    octeto--
                } else {
                    break
                }
            }
            ipRed = suma
        }
        setSubredes(subredes)
    }

    function handlePaginacion(e) {
        let newPage = page + e
        if(newPage < 0) {
            newPage = 0
        }
        if(newPage >= pages) {
            newPage = pages - 1
        }
        setPage(newPage)
        generarSubredes(newPage*256, (newPage + 1)*256)
    }

  return (
    <div className='w-full md:w-1/2 bg-zinc-100 md:h-full gap-3 shadow-lg p-10 space-y-3 flex flex-col justify-between'>
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
            <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded mx-auto block w-full md:w-2/3 lg:w-1/2">
                Calcular Subredes
            </button>
        </form>
        <div className="h-96 md:h-auto overflow-auto bg-white md:flex-grow flex flex-col justify-between"> 
            {pages > 1 && <div className="flex justify-between space-x-3 my-2">
                    <p className="text-neutral-600 text-sm">Página <span className="text-sky-600 font-bold">{page + 1}</span>  de <span className="text-sky-600 font-bold">{pages}</span></p>
                    <div className="flex justify-center space-x-3">
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 px-2 border-blue-700 hover:border-blue-500 rounded text-sm" onClick={() => handlePaginacion(-1)}>Anterior</button>
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 px-2 border-blue-700 hover:border-blue-500 rounded text-sm" onClick={() => handlePaginacion(1)}>Siguiente</button>    
                    </div>    
            </div>}
            <table className="table-auto w-full">
                <thead className="text-white font-bold text-lg bg-sky-600 border-white">
                    <tr>
                    <th className="border-r">N°</th>
                    <th className="border-r">Red</th>
                    <th className="border-r">Hosts</th>
                    <th>Broadcast</th>
                    </tr>
                </thead>
                <tbody className="text-neutral-600 text-sm text-center">
                    {subredes.map((subred, i) => (
                        <tr key={"subred" + i} className={i % 2 === 0 ? '' : 'bg-zinc-300'}>
                            <td>{subred.numero}</td>
                            <td>{subred.red}</td>
                            <td>{subred.hosts}</td>
                            <td>{subred.broadcast}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {pages > 1 && <div className="flex justify-between space-x-3 my-2">
                    <p className="text-neutral-600 text-sm">Página <span className="text-sky-600 font-bold">{page + 1}</span>  de <span className="text-sky-600 font-bold">{pages}</span></p>
                    <div className="flex justify-center space-x-3">
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 px-2 border-blue-700 hover:border-blue-500 rounded text-sm" onClick={() => handlePaginacion(-1)}>Anterior</button>
                        <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 px-2 border-blue-700 hover:border-blue-500 rounded text-sm" onClick={() => handlePaginacion(1)}>Siguiente</button>    
                    </div>    
                </div>}
            </div>
        </div>
    </div>
  )
}
