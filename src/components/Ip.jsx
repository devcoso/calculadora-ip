import{useEffect, useState} from 'react';

import IP from '../models/ip'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import easterEggs from '../helper.js/easterEggs';

export default function Ip({ip, setIp}) {
    const [typeMask, setTypeMask] = useState(0)
    const [valueMask, setValueMask] = useState(24)
    const [valueIp, setValueIp] = useState('192.168.1.0')

    function handletValueIp(value) {
        if(IP.validarIP(value)) {
            let ipEscrito = new IP(value.split('.'), valueMask)
            setValueMask(ipEscrito.getMaskByClase())
        }
        setValueIp(value)
    }

    function handleCrearIP(e) {
        if(easterEggs[valueIp] !== undefined) {
            // Abrir una nueva pestaña con una URL específica
            toast(easterEggs[valueIp], {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        e.preventDefault()
        if(IP.validarIP(valueIp)) {
            let nuevaIp = valueIp.split('.')
            for(let i = 0; i < 4; i++) {
                nuevaIp[i] = parseInt(nuevaIp[i])
            }
            setIp(new IP(nuevaIp, valueMask))
        } else {
            toast.error('IP inválida!', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    function showIPBin(ip) {
        let mask = +ip.getMaskBinary()
        let submask = +ip.getSubMask() - mask
        return ip.getIpBin().split('').map((char, i) => {
            let key = "ipBin" + i
            if(char === '.') return <span key={key} className='text-neutral-600'>{char}</span>
            else if(mask > 0){
                mask--
                return <span key={key} className='text-red-600'>{char}</span>
            } 
            else if(submask > 0){
                submask--
                return <span key={key} className='text-blue-600'>{char}</span>
            } 
            else return <span key={key} className='text-green-600'>{char}</span> 
        })
    }

    return (
      <div className='w-full md:w-1/2 bg-zinc-100 md:h-full gap-3 shadow-lg p-3 md:p-5 space-y-3 flex flex-col justify-between'>
        <ToastContainer
            position="top-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <form onSubmit={e => handleCrearIP(e)}>
            <div className='flex flex-col mb-5'>
                <label htmlFor='ip' className='text-sky-600 font-bold md:text-lg lg:text-xl text-center'>Dirección IP</label>
                <input type='text' id='ip' name='ip' className='w-full lg:w-2/3 xl:w-1/2 m-auto border border-zinc-200 text-center text-base md:text-lg' value={valueIp} onChange={e => handletValueIp(e.target.value)}/>
            </div>
            <div className="space-y-1">
                <label htmlFor="mascara" className='text-sky-600 font-bold md:text-lg lg:text-xl text-center block'>Máscara de red</label>
                <div className='flex justify-around bg-white'>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 0 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`} onClick={() => setTypeMask(0)}>bits</p>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 1 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`}  onClick={() => setTypeMask(1)}>decimal</p>
                    <p className={`w-1/3 font-bold text-sm md:text-base text-center cursor-pointer ${typeMask === 2 ? 'bg-sky-600 text-white' : 'text-neutral-600'}`}  onClick={() => setTypeMask(2)}>hexadecimal</p>
                </div>
                <select className="m-auto block text-base md:text-lg text-center" id="mascara" value={valueMask} onChange={e => setValueMask(e.target.value)}>
                    {Array.from({length: 32}, (_, i) => i + 1).reverse().map((i) => <option key={"ipTypeMask" + i} value={i}>{IP.mostrarTypeMask(i, typeMask)}</option>
                    )}
                </select>
            </div>
            <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded mx-auto block w-full md:w-2/3 lg:w-1/2">
                Calcular IP
            </button>
        </form>
        <div className="space-y-1 md:overflow-y-auto">
            <p className="text-sky-600 font-bold md:text-lg lg:text-xl text-center block">Información de la red</p>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md flex justify-between">
                    <p className="text-neutral-600 font-bold text-sm md:text-base">Tipo</p>
                    <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">CLASE {ip.getClase()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md flex justify-between">
                    <p className="text-neutral-600 font-bold text-sm md:text-base">Red</p>
                    <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">{ip.getRed()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md flex justify-between">
                    <p className="text-neutral-600 font-bold text-sm md:text-base m-0">Hosts</p>
                    <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">{ip.getRangoHosts()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md flex justify-between">
                    <p className="text-neutral-600 font-bold text-sm md:text-base">Broadcast</p>
                    <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">{ip.getBroadcast()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md flex justify-between">
                    <p className="text-neutral-600 font-bold text-sm md:text-base">Hexadecimal</p>
                    <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">{ip.getIpHex()}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
                <div className="w-full bg-white p-3 rounded-md">
                        <p className="text-neutral-600 font-bold text-sm md:text-base text-center">Binario</p>
                        <p className="text-neutral-800 font-extrabold text-sm md:text-base text-center">{
                            showIPBin(ip)
                        }</p>
                    <div className="flex justify-center gap-3">
                        <p className="text-red-600 font-bold">Red</p>
                        <p className="text-blue-600 font-bold">Subred</p>
                        <p className="text-green-600 font-bold">Host</p>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
    )
  }
  