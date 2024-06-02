

export default function Subred() {
  return (
    <div className='w-full md:w-1/2 bg-zinc-100 md:h-full gap-3 shadow-lg p-10 space-y-3 opacity-75 cursor-not-allowed'>
        <p htmlFor='ip' className='text-sky-600 font-bold text-lg md:text-xl lg:text-2xl text-center'>Crea subredes</p>
        <div className="space-y-1">
            <label htmlFor="mascara" className='text-sky-600 font-bold text-lg md:text-xl lg:text-2xl text-center block'>Máscara de la subred</label>
            <div className='flex justify-around bg-white'>
                <p className='w-1/3 text-neutral-600 font-bold text-sm md:text-base text-center'>bits</p>
                <p className='w-1/3 font-bold text-sm md:text-base text-center bg-sky-600 text-white'>decimal</p>
                <p className='w-1/3 text-neutral-600 font-bold text-sm md:text-base text-center'>hexadecimal</p>
            </div>
            <select className="m-auto block text-base md:text-lg text-center" id="mascara">
                <option value="255.255.255.0">255.255.255.0</option>
            </select>
        </div>
        <div className="flex justify-between w-full sm:w-2/3 md:w-full lg:w-2/3 m-auto"> 
            <div>
                <label htmlFor="mascara" className='text-sky-600 font-bold text-sm md:text-base text-center'>Host por subred</label>
                <select className="m-auto block text-base md:text-lg text-center" id="mascara">
                    <option value="255.255.255.0">16</option>
                </select>
            </div>
            <div>
                <label htmlFor="mascara" className='text-sky-600 font-bold text-sm md:text-base text-center'>Subredes</label>
                <select className="m-auto block text-base md:text-lg text-center" id="mascara">
                    <option value="255.255.255.0">16</option>
                </select>
            </div>
        </div>
    </div>
  )
}
