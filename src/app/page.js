import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import { Input } from './components/Input'

export default function Home() {
  const initialForm ={
    cargo: '',
    experiencia: '',
    salario: '',
    habilidad: '',
    requisitos: ''
  }
  const [formValues, handleInputChange, reset] = useForm(initialForm)
  const { cargo, salario, experiencia, habilidad, requisitos } = formValues;
  const abilityList = ['Comunicación', 'Trabajo en equipo', 'Resolución de problemas', 'Adaptabilidad', 'Liderazgo', 'Creatividad', 'Organización', 'Habilidades', 'técnicas', 'Orientación al cliente', 'Pensamiento analítico']

  return (
    <main>
       <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/invenire-logo.svg"
          alt="Invenire Logo"
          width={180}
          height={37}
          priority
        />
      <form>
        <Input placeHolder='especifique el cargo' label='Cargo laboral'/>
        <div class="flex flex-row gap-[20px]">
        <Input placeHolder='escriba un monto' label='Salario'/>
        <Input placeHolder='escriba un numero' label='Años de experiencia'/>
        </div>
        <Input label='Habilidades'>
          <select data-te-select-init className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            {abilityList.map((ability, indx) => 
            <option key={`${ability}-${indx}`} value={ability}>{ability}</option>)}
          </select>
        </Input>
        <Input placeHolder='separe con una coma (,) los requisitos' label='Requisitos excluyentes'/>
      </form>
    </main>
  )
}
