'use client'

import { Toaster } from 'sonner';

export const AppToaster = () => {
    return (
        <Toaster
            position="top-right"
            expand={true}
            visibleToasts={9}
            richColors={false}
            closeButton={false}
            duration={4000}
            toastOptions={{
                style: {
                    fontFamily: 'Manrope, Inter, sans-serif',
                    fontSize: '14px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    border: '1px solid #DFDFDF',
                    color: '#183354',
                    background: '#ffffff',
                    padding: '14px 16px',
                },
                classNames: {
                    title: 'font-semibold',
                    description: 'text-sm',
                },
            }}
        />
    );
};