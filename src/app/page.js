import Image from 'next/image'
import { Input } from './components/Input'

export default function Home() {
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
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
          </select>
        </Input>
        <Input placeHolder='separe con una coma (,) los requisitos' label='Requisitos excluyentes'/>
      </form>
    </main>
  )
}
