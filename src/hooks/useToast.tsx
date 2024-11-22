import { useState } from 'react';

interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

const useToast = () => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000); // Toast will disappear after 3 seconds
    };
    const colors={
        success:"bg-green-500",
        error:"bg-red-500",
        info:"bg-blue-500"
    }

    const ToastElement = () => {
        if (!toast) return null;

        return (
            <div className={`absolute bottom-5 right-5 text-white p-2 rounded-xl ${colors[toast.type]}`}>
                {toast.message}
            </div>
        );
    };

    return { ToastElement, showToast };
};

export {useToast};