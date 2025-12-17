import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input Component
 * Standard form input with optional label and error message
 * 
 * Props:
 * - label: Input label text (string, optional)
 * - placeholder: Placeholder text (string)
 * - type: Input type (default: 'text')
 *   placeholder="Enter your email" 
 *   type="email"
 *   icon={Mail}
 *   error={errors.email}
 * />
 */
export const Input = React.forwardRef(({
    label,
    placeholder,
    type = 'text',
    icon: Icon,
    error,
    className,
    ...props
}, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm',
                        'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
                        'placeholder:text-slate-500',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        Icon && 'pl-10',
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
});

Input.displayName = 'Input';
