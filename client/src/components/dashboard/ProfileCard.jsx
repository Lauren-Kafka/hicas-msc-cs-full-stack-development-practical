import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui';

export const ProfileCard = ({ title }) => {
    const { user } = useAuth();

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <span className="block text-slate-500 mb-1">Full Name</span>
                        <span className="font-medium">{user?.name}</span>
                    </div>
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <span className="block text-slate-500 mb-1">Email Address</span>
                        <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <span className="block text-slate-500 mb-1">User ID</span>
                        <span className="font-mono text-xs">{user?.id || user?._id}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};
