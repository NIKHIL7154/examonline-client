import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
    toast: Toast | null;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
        console.log(message);
        const timer = setTimeout(() => {
            setToast(null);
        }, 4000); // Toast disappears after 4 seconds

        return () => clearTimeout(timer); // Clean up the timeout if the component is unmounted
    };

    return (
        <ToastContext.Provider value={{ showToast, toast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
