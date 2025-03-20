import { useEffect, useState } from "react"

export const useFullScreenDetector = () => {
    const [isFullScreen, setIsFullScreen] = useState(true)
    useEffect(() => {
        const fullScreenChangeHandler = () => {
            setIsFullScreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', fullScreenChangeHandler)
        return () => {
            document.removeEventListener('fullscreenchange', fullScreenChangeHandler)
        }
    }, [])
    return isFullScreen
}