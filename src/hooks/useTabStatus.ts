import { useEffect, useState } from 'react';

const useTabStatus = () => {
  const [tabStatus, setTabStatus] = useState(true);

  const checkTabStatus = () => {
    const isTabVisible = document.visibilityState === 'visible';
    const isTabFocused = document.hasFocus();
    if (isTabVisible && isTabFocused) {
      setTabStatus(true);
    } else {
      setTabStatus(false);
    }
    console.log(isTabVisible && isTabFocused ? "Tab focused" : "Tab switched");
  };

  useEffect(() => {
    // Initial check
    checkTabStatus();
    
    const interval = setInterval(checkTabStatus, 1000); // Polling every second

    return () => clearInterval(interval);
  }, []);

  return tabStatus;
};

export default useTabStatus;
