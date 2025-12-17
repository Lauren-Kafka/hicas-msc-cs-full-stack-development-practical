import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';

export const AuthLayout = ({ children, title, subtitle }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
        >
            <Card className="p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
                {children}
            </Card>
        </motion.div>
    </div>
);
