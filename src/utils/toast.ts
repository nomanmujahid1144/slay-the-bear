// src/app/utils/toast.ts
// Drop-in replacement for react-hot-toast
// Usage: import { toast } from '@/app/utils/toast'
//        toast.success('Done!') / toast.error('Oops') / toast.info(...) / toast.warning(...)

import { toast as sonnerToast, type ExternalToast } from 'sonner';

export const toast = {
    success: (message: string, options?: ExternalToast) =>
        sonnerToast.success(message, {
            style: { borderLeft: '4px solid #29BFF0' },
            ...options,
        }),

    error: (message: string, options?: ExternalToast) =>
        sonnerToast.error(message, {
            style: { borderLeft: '4px solid #dc3545' },
            ...options,
        }),

    info: (message: string, options?: ExternalToast) =>
        sonnerToast.info(message, {
            style: { borderLeft: '4px solid #29BFF0' },
            ...options,
        }),

    warning: (message: string, options?: ExternalToast) =>
        sonnerToast(message, {
            style: { borderLeft: '4px solid #ffc107' },
            ...options,
        }),

    loading: (message: string, options?: ExternalToast) =>
        sonnerToast.loading(message, options),

    dismiss: (id?: string | number) =>
        sonnerToast.dismiss(id),

    promise: <T>(
        promise: Promise<T>,
        messages: Parameters<typeof sonnerToast.promise>[1]
    ) => sonnerToast.promise(promise, messages),
};