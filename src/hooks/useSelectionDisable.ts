import { useEffect } from 'react'

/* type Props = {
} */

/**
 * Prevent user select
 */
export function useSelectionDisable() {
  useEffect(() => {
   

    const element = document.body

    const properties = [
      'user-select',
      '-webkit-user-select',
      '-ms-user-select',
      '-moz-user-select',
    ] as const
    async function removeRightClick(){
      properties.forEach((property) => element.style.setProperty(property, 'none'))
    }
    const interval=setInterval(removeRightClick,1000)
    

    return () => {
      clearInterval(interval)
      properties.forEach((property) => element.style.setProperty(property, 'auto'))
    }

  }, [])

  return
}
