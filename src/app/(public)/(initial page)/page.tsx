import '@/app/globals.css'
import ChoiceFuncionarioEmpresa from '@/_components/ChoiceFuncionarioEmpresa'

export default function Home() {

  return (
    <div className="bg-neutral-50 flex flex-col lg:flex-row items-center justify-center w-full h-full">
      
      <div className='flex h-screen w-1/2 items-center justify-center'> 
        <h1 className='z-10 lg:text-6xl text-4xl font-semibold mt-5'>Tech<span className='text-indigo-500'>Desk</span></h1>
        <img src="home.svg" alt="imagem" className='w-90 h-90 lg:w-130 lg:h-130 absolute'/>
      </div>

      <ChoiceFuncionarioEmpresa />

    </div>
  )
}
