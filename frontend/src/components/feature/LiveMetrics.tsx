'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Activity, Zap } from 'lucide-react';

interface Metric {
    id: number;
    label: string;
    value: number;
    icon: 'users' | 'activity' | 'trending' | 'zap';
    color: string;
}

interface LiveMetricsProps {
    title?: string;
}

export default function LiveMetrics({
    title = 'Live Analytics'
}: LiveMetricsProps) {
    const [mounted, setMounted] = useState(false);
    
    const [counts, setCounts] = useState({
        users: 1247,
        requests: 8934,
        performance: 98,
        responseTime: 45
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setCounts(prev => ({
                users: prev.users + Math.floor(Math.random() * 3),
                requests: prev.requests + Math.floor(Math.random() * 10),
                performance: Math.min(100, (prev.performance + (Math.random() > 0.5 ? 0.1 : -0.1))),
                responseTime: Math.max(20, (prev.responseTime + (Math.random() > 0.5 ? 1 : -1)))
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, [mounted]);

    const metrics = [
        { id: 1, label: 'Active Users', value: counts.users, icon: 'users', color: 'blue', unit: '' },
        { id: 2, label: 'API Requests', value: counts.requests, icon: 'activity', color: 'green', unit: '/m' },
        { id: 3, label: 'Performance', value: counts.performance, icon: 'trending', color: 'purple', unit: '%' },
        { id: 4, label: 'Response Time', value: counts.responseTime, icon: 'zap', color: 'orange', unit: 'ms' },
    ];

    const getIcon = (iconName: string) => {
        const iconProps = { className: 'w-6 h-6' };
        switch (iconName) {
            case 'users': return <Users {...iconProps} />;
            case 'activity': return <Activity {...iconProps} />;
            case 'trending': return <TrendingUp {...iconProps} />;
            case 'zap': return <Zap {...iconProps} />;
            default: return <Activity {...iconProps} />;
        }
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            blue: {
                bg: 'bg-blue-50 dark:bg-blue-950/30',
                text: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-800',
            },
            green: {
                bg: 'bg-green-50 dark:bg-green-950/30',
                text: 'text-green-600 dark:text-green-400',
                border: 'border-green-200 dark:border-green-800',
            },
            purple: {
                bg: 'bg-purple-50 dark:bg-purple-950/30',
                text: 'text-purple-600 dark:text-purple-400',
                border: 'border-purple-200 dark:border-purple-800',
            },
            orange: {
                bg: 'bg-orange-50 dark:bg-orange-950/30',
                text: 'text-orange-600 dark:text-orange-400',
                border: 'border-orange-200 dark:border-orange-800',
            },
        };
        return colors[color] || colors.blue;
    };

    if (!mounted) {
        return <div className="w-full h-full bg-slate-50 dark:bg-gray-900 rounded-2xl animate-pulse" />;
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-slate-950 rounded-2xl p-6 shadow-lg flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time network status
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow">
                {metrics.map((metric) => {
                    const colors = getColorClasses(metric.color);
                    return (
                        <div
                            key={metric.id}
                            className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 transition-all duration-500`}
                        >
                            <div className={`${colors.text} mb-3`}>
                                {getIcon(metric.icon)}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
                                    {metric.label}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <p className={`text-2xl font-bold ${colors.text} tabular-nums transition-all duration-300`}>
                                        {metric.id <= 2 ? Math.floor(metric.value).toLocaleString() : metric.value.toFixed(1)}
                                    </p>
                                    <span className={`text-xs font-semibold ${colors.text} opacity-80 uppercase`}>
                                        {metric.unit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="relative flex h-2 w-2">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">
                            Live Stream Active
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono">
                        v2.4.0-stable
                    </p>
                </div>
            </div>
        </div>
    );
}
