import { useEffect, useRef, useState } from 'react'
const useTabStatus = (divRef: React.RefObject<HTMLDivElement> | null, socketStatus: boolean) => {
    const [isTabActive, setIsTabActive] = useState(true);
    const flag = useRef<boolean>(false);
    useEffect(() => {
        const mainDiv = divRef?.current;
        mainDiv?.focus();
        const handleFocusIn = () => {
            // setIsTabActive(true);
            console.log("Div gained focus");
        };
        const handleFocusOut = () => {
            console.log(flag.current);
            setTimeout(() => {
                if (flag.current) {
                    flag.current = false;
                    console.log("Flag is true");
                    return;
                }
                console.log("Div lost focus");
                mainDiv?.focus();
                setIsTabActive(false);

            }, 1)
        };
        const handleMouseDown = (e: MouseEvent) => {
            if (divRef?.current?.contains(e.target as Node)) {
                console.log("Mouse down inside");
                flag.current = true;
               
            }
        };
        const handleMouseUp = () => {
            flag.current = false;
        };

        const handleClickInside = (e: MouseEvent) => {
            if (divRef?.current?.contains(e.target as Node)) {
                console.log("Mouse clicked inside div");
                flag.current = true;
            }
            setTimeout(() => {
                flag.current = false;
                mainDiv?.focus();
            },20)
        };
        console.log(mainDiv)
        console.log("Adding event listeners");
        // Adding focusin and focusout events, as they bubble
        mainDiv?.addEventListener("focus", handleFocusIn);
        mainDiv?.addEventListener("blur", handleFocusOut);
        mainDiv?.addEventListener("mousedown", handleMouseDown);
        mainDiv?.addEventListener("mouseup", handleMouseUp);
        mainDiv?.addEventListener("click", handleClickInside);
        return () => {
            mainDiv?.removeEventListener("mousedown", handleMouseDown);
            mainDiv?.removeEventListener("focus", handleFocusIn);
            mainDiv?.removeEventListener("blur", handleFocusOut);
            mainDiv?.removeEventListener("mouseup", handleMouseUp);
            mainDiv?.removeEventListener("click", handleClickInside);
            console.log("Removing event listeners");
        };
    }, [divRef, socketStatus]);

    return (
        [isTabActive, setIsTabActive]
    )
}

export default useTabStatus
