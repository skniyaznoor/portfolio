'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Activity, Zap } from 'lucide-react';

interface Metric {
    id: number;
    label: string;
    value: number;
    maxValue: number;
    icon: 'users' | 'activity' | 'trending' | 'zap';
    color: string;
    duration: number;
}

interface LiveMetricsProps {
    metrics?: Metric[];
    title?: string;
}

export default function LiveMetrics({
    metrics,
    title = 'Live Analytics'
}: LiveMetricsProps) {
    const defaultMetrics: Metric[] = [
        { id: 1, label: 'Active Users', value: 0, maxValue: 1247, icon: 'users', color: 'blue', duration: 5000 },
        { id: 2, label: 'API Requests', value: 0, maxValue: 8934, icon: 'activity', color: 'green', duration: 6000 },
        { id: 3, label: 'Performance', value: 0, maxValue: 98, icon: 'trending', color: 'purple', duration: 5000 },
        { id: 4, label: 'Response Time', value: 0, maxValue: 45, icon: 'zap', color: 'orange', duration: 5000 },
    ];

    const metricList = metrics || defaultMetrics;
    const [currentValues, setCurrentValues] = useState<Record<number, number>>(
        Object.fromEntries(metricList.map(m => [m.id, 0]))
    );
    const [activeMetric, setActiveMetric] = useState<number | null>(null);

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

    const getColorClasses = (color: string, isActive: boolean) => {
        const colors: Record<string, { bg: string; text: string; border: string; activeBg: string }> = {
            blue: {
                bg: 'bg-blue-50 dark:bg-blue-950/30',
                text: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-800',
                activeBg: 'bg-blue-100 dark:bg-blue-900/50'
            },
            green: {
                bg: 'bg-green-50 dark:bg-green-950/30',
                text: 'text-green-600 dark:text-green-400',
                border: 'border-green-200 dark:border-green-800',
                activeBg: 'bg-green-100 dark:bg-green-900/50'
            },
            purple: {
                bg: 'bg-purple-50 dark:bg-purple-950/30',
                text: 'text-purple-600 dark:text-purple-400',
                border: 'border-purple-200 dark:border-purple-800',
                activeBg: 'bg-purple-100 dark:bg-purple-900/50'
            },
            orange: {
                bg: 'bg-orange-50 dark:bg-orange-950/30',
                text: 'text-orange-600 dark:text-orange-400',
                border: 'border-orange-200 dark:border-orange-800',
                activeBg: 'bg-orange-100 dark:bg-orange-900/50'
            },
        };
        const colorSet = colors[color] || colors.blue;
        return {
            bg: isActive ? colorSet.activeBg : colorSet.bg,
            text: colorSet.text,
            border: colorSet.border,
        };
    };

    useEffect(() => {
        let currentIndex = 0;
        let interval: NodeJS.Timeout;

        const animateMetric = () => {
            if (currentIndex >= metricList.length) {
                setTimeout(() => {
                    setCurrentValues(Object.fromEntries(metricList.map(m => [m.id, 0])));
                    setActiveMetric(null);
                    currentIndex = 0;
                    animateMetric();
                }, 3000);
                return;
            }

            const metric = metricList[currentIndex];
            setActiveMetric(metric.id);

            const duration = metric.duration;
            const steps = 60;
            const increment = metric.maxValue / steps;
            const stepDuration = duration / steps;
            let currentStep = 0;

            interval = setInterval(() => {
                currentStep++;
                if (currentStep >= steps) {
                    clearInterval(interval);
                    setCurrentValues(prev => ({ ...prev, [metric.id]: metric.maxValue }));
                    setActiveMetric(null);
                    setTimeout(() => {
                        currentIndex++;
                        animateMetric();
                    }, 800);
                } else {
                    setCurrentValues(prev => ({
                        ...prev,
                        [metric.id]: Math.min(Math.round(currentStep * increment), metric.maxValue)
                    }));
                }
            }, stepDuration);
        };

        animateMetric();

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [metricList]);

    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-950 rounded-2xl p-6 shadow-lg flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time performance metrics
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
                {metricList.map((metric) => {
                    const isActive = activeMetric === metric.id;
                    const colors = getColorClasses(metric.color, isActive);
                    const percentage = (currentValues[metric.id] / metric.maxValue) * 100;

                    return (
                        <div
                            key={metric.id}
                            className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 transition-all duration-300 ${isActive ? 'scale-105 shadow-lg' : ''
                                }`}
                        >
                            <div className={`${colors.text} mb-3`}>
                                {getIcon(metric.icon)}
                            </div>
                            <div className="mb-2">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    {metric.label}
                                </p>
                                <p className={`text-2xl font-bold ${colors.text} tabular-nums`}>
                                    {currentValues[metric.id].toLocaleString()}
                                    {metric.icon === 'trending' && '%'}
                                    {metric.icon === 'zap' && 'ms'}
                                </p>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className={`h-full ${colors.text.replace('text-', 'bg-')} transition-all duration-300 rounded-full`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                        Last updated: just now
                    </span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                            Live
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
