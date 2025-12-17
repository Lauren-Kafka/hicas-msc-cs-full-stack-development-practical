import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui';

export const DashboardHeader = ({ title, subtitleText }) => {
    const { user, logout } = useAuth();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-slate-500">{subtitleText || `Welcome back, ${user?.name}`}</p>
                </div>
            </div>
            <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
    );
};
