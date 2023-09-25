import Image from 'next/image'

const Logo = () => {
  return (
    <Image 
      src='/logo.svg'
      alt='logo'
      height={130}
      width={130}
    />
  )
}

export default Logo
