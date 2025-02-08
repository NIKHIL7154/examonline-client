import { useEffect, useState } from 'react'
const useTabStatus = () => {
    const [tabStatus,settabStatus]=useState("true");
    
    useEffect(() => {
        document.addEventListener("blur",()=>settabStatus("false"))
        document.addEventListener("focus",()=>settabStatus("true"))
        window.addEventListener("blur",()=>settabStatus("false"))
        window.addEventListener("focus",()=>settabStatus("true"))
        return () => {
            function removeEventListener() {
                document.removeEventListener("blur",()=>settabStatus("false"))
                document.removeEventListener("focus",()=>settabStatus("true"))
                window.removeEventListener("blur",()=>settabStatus("false"))
                window.removeEventListener("focus",()=>settabStatus("true"))
            }
            removeEventListener();
        };
    }, []);
    
  return (
    tabStatus
  )
}

export default useTabStatus
