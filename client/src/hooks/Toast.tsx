import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useToast } from './ToastContext'

const Toast = () => {
    const { toast } = useToast();
    const toastRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (toastRef.current && toast) {
            gsap.fromTo(
                toastRef.current,
                { opacity: 0, y: 200 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
            const timeoutId = setTimeout(() => {
                gsap.to(toastRef.current, { opacity: 0, y: 200, duration: 0.5, ease: 'power3.out' });
            }, 3500);

            return () => clearTimeout(timeoutId);
        }
    }, [toast]);

    if (!toast) return null;

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div
            ref={toastRef}
            className={`absolute bottom-5 right-5 text-white p-4 rounded-lg ${colors[toast.type]} max-w-[90vw] z-[1000]`}
        >
            {toast.message}
        </div>
    );
};

export default Toast;
