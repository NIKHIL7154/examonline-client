import { useCallback, useEffect } from "react"



/**
 * Prevent Right Click:
 * User should not be able to access default context menu on right click
 */
export function useDisableContextMenu() {
  const contextMenuListener = useCallback((e: MouseEvent) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    const removeListener = () => {
      window.removeEventListener("contextmenu", contextMenuListener)
    }
    

    window.addEventListener("contextmenu", contextMenuListener)
    return removeListener
  }, [contextMenuListener])

  return
}
