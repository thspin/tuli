// src/components/ui/Select.tsx
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    options?: Array<{ value: string; label: string }>;
}

export default function Select({
    label,
    error,
    helperText,
    fullWidth = true,
    options,
    children,
    className = '',
    ...props
}: SelectProps) {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500';

    return (
        <div className={widthClass}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <select
                className={`${widthClass} p-2 border rounded-lg focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100 ${errorClass} ${className}`}
                {...props}
            >
                {options ? (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                ) : (
                    children
                )}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {!error && helperText && (
                <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
}
