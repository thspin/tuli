// src/hooks/useAsync.ts
'use client'

import { useState, useCallback } from 'react';

interface AsyncState<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

/**
 * Hook para manejar operaciones asíncronas
 */
export function useAsync<T = any>() {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
        setState({ data: null, error: null, loading: true });

        try {
            const result = await asyncFunction();
            setState({ data: result, error: null, loading: false });
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setState({ data: null, error: errorMessage, loading: false });
            throw error;
        }
    }, []);

    const reset = useCallback(() => {
        setState({ data: null, error: null, loading: false });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}
