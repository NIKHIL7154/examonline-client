import { useEffect, useRef } from "react";

type Handler = () => void;

export default function useOutsideClick(handler: Handler, listenCapturing: boolean = true) {
    const ref = useRef<HTMLElement | HTMLDivElement | null>(null); // Specify the type for the ref

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }

        document.addEventListener("click", handleClick, listenCapturing);

        return () => {
            document.removeEventListener("click", handleClick, listenCapturing);
        };
    }, [handler, listenCapturing]);

    return ref;
}