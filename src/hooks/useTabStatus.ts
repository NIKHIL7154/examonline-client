import { useEffect, useState } from 'react'
const useTabStatus = () => {
  const [tabStatus, settabStatus] = useState("true");

  useEffect(() => {
    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("blur", () => settabStatus("false"))
    document.addEventListener("focus", () => settabStatus("true"))
    window.addEventListener("blur", () => settabStatus("false"))
    window.addEventListener("focus", () => settabStatus("true"))

    document.addEventListener("visibilitychange", () => settabStatus("false"))
    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      function removeEventListener() {
        document.removeEventListener("blur", () => settabStatus("false"))
        document.removeEventListener("focus", () => settabStatus("true"))
        window.removeEventListener("blur", () => settabStatus("false"))
        window.removeEventListener("focus", () => settabStatus("true"))
        
        document.removeEventListener("visibilitychange", () => settabStatus("false"))
        document.removeEventListener("contextmenu", preventRightClick);
      }
      removeEventListener();
    };
  }, []);

  return (
    tabStatus
  )
}

export default useTabStatus