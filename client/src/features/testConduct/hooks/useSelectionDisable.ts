import { useEffect } from 'react'

/* type Props = {
} */

/**
 * Prevent user select
 */
export function useSelectionDisable(divRef: React.RefObject<HTMLDivElement>,socketStatus:boolean) {
  useEffect(() => {


    const parent = divRef.current
    const selectionDisbaleInterval = setInterval(() => {
      const properties = [
        'user-select',
        '-webkit-user-select',
        '-ms-user-select',
        '-moz-user-select',
      ] as const
      const childs = parent?.querySelectorAll('*')
      childs?.forEach((child) => {
        properties.forEach((property) => (child as HTMLElement)?.style.setProperty(property, 'none', 'important'))
      })
    

    }, 500);


    return () => {
      clearInterval(selectionDisbaleInterval)
    }
  }, [divRef,socketStatus])

  return
}
