'use client'

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Image, Landmark, Map } from 'lucide-react'

interface AnimationCardProps {
  title: string;
  value: number;
  icon: 'Image' | 'Map' | 'City' | 'Heart';
  description?: string;
}

const iconMap = {
  'Image': <Image size={22} className='text-muted-foreground' />,
  'Map': <Map size={22} className='text-muted-foreground' />,
  'City': <Landmark size={22} className='text-muted-foreground' />,
  'Heart': <Heart size={22} className='text-muted-foreground' />,
}

const AnimationCard = ({
  title,
  value,
  icon,
  description
}: AnimationCardProps) => {
  let spring = useSpring(0, { mass: 1, stiffness: 75, damping: 15 });
  let display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          {iconMap[icon]}
        </CardHeader>
        <CardContent>
          <motion.div className="text-2xl font-bold">{display}</motion.div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default AnimationCard
