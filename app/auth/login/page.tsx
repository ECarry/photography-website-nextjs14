import { db } from '@/lib/db'
import Image from 'next/image'
import LoginForm from '../_components/login-form'

const LoginPage = async () => {
  const photos = await db.photo.findMany({
    where: {
      category: {
        title: 'ecarry'
      }
    }
  })

  if (photos.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * photos.length)
  const imageUrl = photos[randomIndex].imageUrl

  return (
    <main className='w-full h-screen flex flex-col lg:flex-row'>
      <div className='flex-1 overflow-hidden'>
        <Image 
          src={imageUrl}
          alt='login image'
          width={1920}
          height={1080}
          className='object-cover w-full h-full'
        />
      </div>

      <div className='flex-1 flex items-center justify-center'>
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
