import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Button Component
 * Supports primary, secondary, and outline variants
 * 
 * Props:
 * - text: Button text (string)
 * - variant: 'primary' | 'secondary' | 'outline' (default: 'primary')
 * - size: 'default' | 'sm' | 'icon' (default: 'default')
 * - isLoading: Show loading spinner (boolean)
 * - onClick: Click handler (function)
 * - type: 'button' | 'submit' | 'reset' (default: 'button')
 * - className: Additional custom classes (optional)
 */
export const Button = ({
    text,
    children,
    variant = 'primary',
    size = 'default',
    isLoading = false,
    className,
    ...props
}) => {
    const variants = {
        primary: 'bg-slate-900 text-white hover:bg-slate-800',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        outline: 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-900',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        icon: 'h-10 w-10',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium',
                'ring-offset-white transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {text || children}
        </button>
    );
};
