'use client'

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Image, Map } from 'lucide-react'

interface CustomCardProps {
  title: string;
  value: number;
  icon: 'Image' | 'Map';
}

const iconMap = {
  'Image': <Image size={22} className='text-gray-500' />,
  'Map': <Map size={22} className='text-gray-500' />
}

const CustomCard = ({
  title,
  value,
  icon
}: CustomCardProps) => {
  let spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
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
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default CustomCard
