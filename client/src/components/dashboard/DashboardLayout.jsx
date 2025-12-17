import React from 'react';
import { motion } from 'framer-motion';

export const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto space-y-6"
            >
                {children}
            </motion.div>
        </div>
    );
};
