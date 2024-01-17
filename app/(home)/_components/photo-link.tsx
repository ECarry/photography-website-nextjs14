'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Photo } from '@prisma/client';

export default function PhotoLink({
  photo,
  prefetch,
  children,
}: {
  photo?: Photo
  prefetch?: boolean
  children: ReactNode
}) {

  return (
    photo
      ? <Link
        href={`/p/${photo.id}`}
        prefetch={prefetch}
        scroll={false}
      >
        {children}
      </Link>
      : <span className="text-gray-300 dark:text-gray-700 cursor-default">
        {children}
      </span>
  );
};
