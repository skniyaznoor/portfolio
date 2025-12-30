'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    duration: number;
}

interface TaskProgressProps {
    tasks?: Task[];
    projectTitle?: string;
}

const defaultTasks: Task[] = [
    { id: 1, title: 'Design System Setup', duration: 2500 },
    { id: 2, title: 'Component Architecture', duration: 3000 },
    { id: 3, title: 'API Integration', duration: 3500 },
    { id: 4, title: 'Testing & Optimization', duration: 3000 },
    { id: 5, title: 'Deployment', duration: 2500 },
];

export default function TaskProgress({
    tasks,
    projectTitle = 'Project Development'
}: TaskProgressProps) {
    const taskList = React.useMemo(() => tasks || defaultTasks, [tasks]);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [activeTask, setActiveTask] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mounted, setMounted] = useState(false);
    const [taskIndex, setTaskIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !mounted) {
            setCompletedTasks([]);
            setTaskIndex(0);
            setActiveTask(null);
            setProgress(0);
            setIsResetting(false);
            return;
        }

        if (isResetting) return;

        if (taskIndex < taskList.length) {
            const task = taskList[taskIndex];

            timeoutRef.current = setTimeout(() => {
                setActiveTask(task.id);
                setProgress(100);

                timeoutRef.current = setTimeout(() => {
                    setCompletedTasks(prev => [...prev, task.id]);
                    setActiveTask(null);
                    setProgress(0);

                    timeoutRef.current = setTimeout(() => {
                        setTaskIndex(prev => prev + 1);
                    }, 600);
                }, task.duration);
            }, 400);
        } else {
            const timer = setTimeout(() => {
                setIsResetting(true);
            }, 1500);
            return () => clearTimeout(timer);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isVisible, mounted, taskIndex, taskList, isResetting]);

    useEffect(() => {
        if (!isResetting) return;

        const timer = setTimeout(() => {
            setCompletedTasks([]);
            setTaskIndex(0);
            setProgress(0);
            setActiveTask(null);

            const restartTimer = setTimeout(() => {
                setIsResetting(false);
            }, 400);

            return () => clearTimeout(restartTimer);
        }, 800);

        return () => clearTimeout(timer);
    }, [isResetting]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 rounded-2xl p-8 shadow-xl flex flex-col overflow-hidden border border-slate-200 dark:border-indigo-900/30 transition-all duration-300"
        >
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {projectTitle}
                    </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Development Pipeline
                </p>
            </div>

            <div className="flex-grow space-y-4 overflow-y-auto px-2">
                {taskList.map((task, index) => {
                    const isCompleted = completedTasks.includes(task.id);
                    const isActive = activeTask === task.id;

                    return (
                        <div
                            key={task.id}
                            className={`p-4 rounded-xl transition-all duration-500 ease-out ${isCompleted
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-400/60 dark:border-green-500/40 shadow-sm'
                                : isActive
                                    ? 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-2 border-indigo-500 dark:border-indigo-400 scale-[1.02] shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30'
                                    : 'bg-white dark:bg-gray-800/40 border-2 border-gray-200/60 dark:border-gray-700/40 opacity-70 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            style={{
                                transitionDelay: isResetting ? `${index * 80}ms` : '0ms',
                                opacity: isResetting ? 0 : 1,
                                transform: isResetting ? 'scale(0.95)' : 'scale(1)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400 animate-scaleIn" />
                                    ) : isActive ? (
                                        <div className="relative w-7 h-7">
                                            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800"></div>
                                            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin"></div>
                                        </div>
                                    ) : (
                                        <Circle className="w-7 h-7 text-gray-400 dark:text-gray-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`font-semibold text-base transition-all duration-300 ${isCompleted
                                            ? 'text-green-700 dark:text-green-300 line-through decoration-2'
                                            : isActive
                                                ? 'text-indigo-700 dark:text-indigo-300'
                                                : 'text-gray-700 dark:text-gray-400'
                                            }`}
                                    >
                                        {task.title}
                                    </p>
                                    {isActive && (
                                        <div className="mt-2.5 w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden shadow-inner">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400"
                                                style={{
                                                    width: `${progress}%`,
                                                    transition: progress > 0 ? `width ${task.duration}ms linear` : 'none'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-indigo-800/50">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                        Completed: <span className="text-gray-900 dark:text-gray-200">{completedTasks.length}</span>/{taskList.length}
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${(completedTasks.length / taskList.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold min-w-[3ch] text-right">
                            {Math.round((completedTasks.length / taskList.length) * 100)}%
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scaleIn {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
        </div>
    );
}
