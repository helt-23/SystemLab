import Image from '../../assets/images/file.svg'
export function LogoSystem() {
  return (
    <div className="bg-white rounded-full p-2 shadow-md flex items-center justify-center w-[250px] h-[250px] overflow-hidden">
      <img
        src={Image}
        alt="Descrição da imagem"
        className="w-full h-full object-cover"
      />
    </div>

  )
}
export default LogoSystem;