import React from 'react';
import { User, Lock, LayoutDashboard } from 'lucide-react';
import { Card } from '../ui';

const StatCard = ({ label, value, icon: Icon, valueColor }) => (
    <Card className="p-6 space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-sm">
            <span>{label}</span>
            {Icon && <Icon className="h-4 w-4" />}
        </div>
        <div className={`text-2xl font-bold ${valueColor}`}>
            {value}
        </div>
    </Card>
);

export const StatsGrid = () => {
    // Mock data for dashboard stats
    const statCards = [
        { label: 'Account Status', value: 'Active', icon: User, valueColor: 'text-green-600' },
        { label: 'Role', value: 'Student', icon: Lock, valueColor: 'text-slate-900' },
        { label: 'Session', value: 'Current', icon: LayoutDashboard, valueColor: 'text-slate-900' },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {statCards.map((card, index) => (
                <StatCard
                    key={index}
                    label={card.label}
                    value={card.value}
                    icon={card.icon}
                    valueColor={card.valueColor}
                />
            ))}
        </div>
    );
};
