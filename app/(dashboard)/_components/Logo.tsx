import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
      <Image 
        src='/logo.svg'
        alt='logo'
        height={130}
        width={130}
      />
    </Link>
  )
}

export default Logo
