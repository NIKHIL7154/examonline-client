import React, { useEffect, useState } from 'react'
import useTabStatus from '../../hooks/useTabStatus';
import { useSelectionDisable } from '../../hooks/useSelectionDisable';

type StyleProperties = {
    [key: string]: string;
  };

const Tabswitch = () => {
    const [count, setcount] = useState(0);
    const [leftDivState, setleftDivState] = useState("");
    const [rightDivState, setrightDivState] = useState("");
    //const tabstatus=useTabStatus();
    //useSelectionDisable();

    const stylesWithImportant:StyleProperties = {
        "user-select": "none",
        "-webkit-user-select": "none",
        "-webkit-user-drag": "none",
        "-webkit-touch-callout": "none",
      };

    useEffect(() => {
        const handleBlur = (event: FocusEvent) => {

            if (event.target === document.getElementById('leftdiv')) {
                setleftDivState('Left div lost focus');
            } else if (event.target === document.getElementById('rightdiv')) {
                setrightDivState('Right div lost focus');
            }
        };

        const handleFocus = (event: FocusEvent) => {

            if (event.target === document.getElementById('leftdiv')) {
                setleftDivState('Left div gained focus');
            } else if (event.target === document.getElementById('rightdiv')) {
                setrightDivState('Right div gained focus');
            }
        };

        
        const leftDiv = document.getElementById('leftdiv');
        const rightDiv = document.getElementById('rightdiv');
        
        const updateStyles=()=>{
            if(leftDiv){
                console.log('updating styles leftdiv');
                for (const [key, value] of Object.entries(stylesWithImportant)) {
                    leftDiv.style.setProperty(key, value, "important");
                  }
            }
            if(rightDiv){
                console.log('updating styles rightdiv');
                for (const [key, value] of Object.entries(stylesWithImportant)) {
                    rightDiv.style.setProperty(key, value, "important");
                  }

            }
        }
        const updateStylesInterval=setInterval(updateStyles,800);

        leftDiv?.addEventListener('blur', handleBlur);
        leftDiv?.addEventListener('focus', handleFocus);
        rightDiv?.addEventListener('blur', handleBlur);
        rightDiv?.addEventListener('focus', handleFocus);



        /* const intervalId = setInterval(() => {
            
            if (leftDiv && leftDiv.style.userSelect !== 'none') {
                leftDiv.style.userSelect = 'none';
            }

            if (rightDiv && rightDiv.style.userSelect !== 'none') {
                rightDiv.style.userSelect = 'none';
            }
        }, 1000); */

        const disableKeyboard = (e: KeyboardEvent) => {
            e.preventDefault();
            console.log(`Keyboard event blocked: ${e.type}, Key: ${e.key}`);
        };

        // Function to prevent right-click
        const disableRightClick = (e: MouseEvent) => {
            e.preventDefault();
            console.log("Right-click event blocked");
        };

        // Add event listeners for keyboard events
        window.addEventListener("keydown", disableKeyboard);
        window.addEventListener("keyup", disableKeyboard);
        window.addEventListener("keypress", disableKeyboard);

        // Add event listener for right-click
        window.addEventListener("contextmenu", disableRightClick);

        return () => {
            //observer.disconnect();
            //clearInterval(intervalId);
            clearInterval(updateStylesInterval);
            window.removeEventListener("keydown", disableKeyboard);
            window.removeEventListener("keyup", disableKeyboard);
            window.removeEventListener("keypress", disableKeyboard);
            window.removeEventListener("contextmenu", disableRightClick);
            leftDiv?.removeEventListener('blur', handleBlur);
            leftDiv?.removeEventListener('focus', handleFocus);
            rightDiv?.removeEventListener('blur', handleBlur);
            rightDiv?.removeEventListener('focus', handleFocus);

        };
    }, []);

    return (
        <div className='w-[100vw] h-[100vh] flexed'>
            <div className='w-[50%] h-full flexed outline-none !select-none z-0 cursor-default relative' draggable={false} id='leftdiv' tabIndex={0}>{leftDivState}h
                {/* <div className='absolute w-full h-full bg-transparent z-50'></div> */}

            </div>
            <div className='w-[50%] h-full flexed outline-none z-0 !select-none relative cursor-default' id='rightdiv' tabIndex={0}>{rightDivState}n
                {/* <div className='absolute w-full h-full bg-transparent z-50'></div> */}
            </div>
        </div>
    )
}

export default Tabswitch