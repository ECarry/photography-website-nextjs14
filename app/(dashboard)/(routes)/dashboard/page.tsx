import type { Metadata } from 'next'
import { initialUser } from "@/lib/initial-user"
import { db } from '@/lib/db'
import { coordinateToCitys } from '@/lib/coordinateToCitys'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CustomCard from '../../_components/CustomCard'
import MapboxWithMarks from '@/components/MapboxWithMarks'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const metadata: Metadata = {
  title: 'Dashboard - ECarry Photography',
  description: 'Dashboard',
}

const page = async () => {
  const user = await initialUser()

  const photos = await db.photo.findMany({})

  const data = await coordinateToCitys([24.435848436046797, 118.36163127453034])

  console.log('=======>', data);

  return (
    <div className='flex flex-col gap-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomCard title='Total Photo' value={photos.length} icon='Image' />

        <CustomCard title='Places' value={200} icon='Map' />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Now
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='rounded-lg overflow-hidden'>
        <AspectRatio ratio={16 / 9}>
          <MapboxWithMarks photos={photos} />
        </AspectRatio>
      </div>
    </div>
  )
}

export default page
