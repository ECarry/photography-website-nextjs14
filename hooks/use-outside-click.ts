import { RefObject, useEffect } from "react"

const useOutsideClick = (callback: () => void, ref: RefObject<HTMLElement>) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
}

export default useOutsideClick
