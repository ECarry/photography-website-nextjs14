import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const initialUser = async () => {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const findUser = await db.user.findUnique({
    where: {
      userId: user.id
    }
  })

  if (findUser) {
    return findUser
  }

  const newUser = await db.user.create({
    data: {
      userId: user.id,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
    }
  })

  return newUser
}
