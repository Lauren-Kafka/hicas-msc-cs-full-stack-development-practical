import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card Component
 * A flexible container with standard styling
 * 
 * Props:
 * - title: Card title (string, optional)
 * - subtitle: Card subtitle (string, optional)
 * - children: Card content (React nodes)
 * - className: Additional custom classes (optional)
 *   <p>Card content here</p>
 * </Card>
 */
export const Card = ({
    title,
    subtitle,
    children,
    className
}) => {
    return (
        <div className={cn(
            'rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm',
            className
        )}>
            {(title || subtitle) && (
                <div className="p-6 pb-4">
                    {title && (
                        <h2 className="text-xl font-semibold text-slate-900">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            <div className={title || subtitle ? 'px-6 pb-6' : 'p-6'}>
                {children}
            </div>
        </div>
    );
};
