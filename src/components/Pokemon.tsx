type Props = {
 name: string
 img: string
}

function Pokemon({name, img}:Props) {
  return (
      <div className="p-8 mt-8">
    <div className="">
      <h2 className="text-xl font-bold">{name}</h2>
      <img src={img} alt={name} />
    </div>
  </div>
  )
}
export default Pokemon