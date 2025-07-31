'use client'

import { useState } from "react"
import FuncionarioLogin from "../FuncionarioLogin"
import EmpresaLogin from "../EmpresaLogin"

export default function ChoiceFuncionarioEmpresa() {
    
    type choice = 'funcionario' | 'empresa'
  const [state, setState] = useState<choice>('funcionario')

    return (
      <div className='flex flex-col lg:border-l-2 lg:border-t-0 border-t-2 h-screen w-full lg:w-1/2 items-center justify-center'>
      
      <h1 className='font-semibold text-2xl'>Você é:</h1>

      <div className='w-full max-w-[50vh] lg:max-w-[40vh] relative h-[6vh] mb-5 rounded-md flex justify-center items-center border-neutral-200 border-1 p-0.5 botoes'>
          <button onClick={() => setState('funcionario')} className={`escolhaFuncionarioEmpresa ${state == 'funcionario' ? 'ativo' : ''}`}>Funcionário</button>
          <button onClick={() => setState('empresa')} className={`escolhaFuncionarioEmpresa ${state == 'empresa' ? 'ativo' : ''}`}>Empresa</button>
          <div className='indicator'></div>
      </div>

        {state == 'funcionario' && <div className='w-full max-w-[45vh] mt-5'>
          <FuncionarioLogin/>
        </div>
        }

        {state == 'empresa' && <div className='w-full max-w-[45vh] mt-5'>
        <EmpresaLogin/>
        </div>
        }
        
      </div>
    )
}