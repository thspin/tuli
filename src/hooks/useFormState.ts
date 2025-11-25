// src/hooks/useFormState.ts
'use client'

import { useState, useCallback, ChangeEvent } from 'react';

/**
 * Hook para manejar el estado de formularios
 */
export function useFormState<T extends Record<string, any>>(initialState: T) {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = useCallback((
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name as keyof T]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    }, [errors]);

    const setFieldValue = useCallback((name: keyof T, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const setFieldError = useCallback((name: keyof T, error: string) => {
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    }, []);

    const reset = useCallback(() => {
        setFormData(initialState);
        setErrors({});
    }, [initialState]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        formData,
        errors,
        handleChange,
        setFieldValue,
        setFieldError,
        setFormData,
        setErrors,
        reset,
        clearErrors,
    };
}
