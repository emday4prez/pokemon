import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

type Props = {
  name: string
  img: string
  setSelectedPokemonURL: React.Dispatch<React.SetStateAction<string>>
  handlePreviousOption: () => void | null
  handleNextOption: () => void | null
}

function Pokemon({
  name,
  img,
  setSelectedPokemonURL,
  handleNextOption,
  handlePreviousOption,
}: Props) {
  return (
    <div className='p-8 mt-8'>
      <div className=''>
        <h2 className='text-xl font-bold'>{name}</h2>
        <div className='flex'>
          <div className='flex items-center min-h-full'>
            <LeftArrow />
          </div>

          <img src={img} alt={name} />
          <div className='flex items-center min-h-full'>
            <RightArrow />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Pokemon
