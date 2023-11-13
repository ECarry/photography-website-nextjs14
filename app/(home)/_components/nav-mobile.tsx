'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react'
import { links } from './routes';


const NavMobile = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <header className='flex items-center px-6 justify-end md:hidden fixed top-0 left-0 z-10 h-[40px] w-full backdrop-blur-sm'>
      <Menu  className='cursor-pointer' onClick={() => setOpen(pre => !pre)} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-white border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {links.map((route, idx) => {
                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.label}
                    className="w-full p-[0.08rem] rounded-xl "
                  >
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl "
                      }
                      href={route.href}
                    >
                      <span className="flex gap-1 text-lg">{route.label}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavMobile
