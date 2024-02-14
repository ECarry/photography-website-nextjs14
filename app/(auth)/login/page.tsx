import { db } from '@/lib/db'
import Image from 'next/image'
import { unstable_noStore as noStore } from 'next/cache';

import LoginForm from '../_components/login-form'

const LoginPage = async () => {
  noStore();

  const photos = await db.photo.findMany({})

  if (photos.length === 0) {
    return (
    <main className='w-full h-screen flex flex-col lg:flex-row'>
      <div className='flex-1 flex items-center justify-center'>
        <LoginForm />
      </div>
    </main>
  )
  }

  const randomIndex = Math.floor(Math.random() * photos.length)
  const imageUrl = photos[randomIndex].imageUrl

  return (
    <main className='w-full h-screen flex flex-col lg:flex-row'>
      <div className='flex-1 overflow-hidden p-4 md:p-8'>
        <Image 
          src={imageUrl}
          alt='login image'
          priority
          width={1920}
          height={1080}
          className='object-cover w-full h-full rounded-lg md:rounded-3xl'
        />
      </div>

      <div className='flex-1 flex items-center justify-center'>
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
