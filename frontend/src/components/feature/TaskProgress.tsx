'use client';

import React, { useState, useEffect } from 'react';
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

export default function TaskProgress({
    tasks,
    projectTitle = 'Project Development'
}: TaskProgressProps) {
    const defaultTasks: Task[] = [
        { id: 1, title: 'Design System Setup', duration: 3000 },
        { id: 2, title: 'Component Architecture', duration: 4000 },
        { id: 3, title: 'API Integration', duration: 5000 },
        { id: 4, title: 'Testing & Optimization', duration: 4000 },
        { id: 5, title: 'Deployment', duration: 3000 },
    ];

    const taskList = tasks || defaultTasks;
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [activeTask, setActiveTask] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentIndex = 0;
        let progressInterval: NodeJS.Timeout;

        const processTask = () => {
            if (currentIndex >= taskList.length) {
                setTimeout(() => {
                    setCompletedTasks([]);
                    setActiveTask(null);
                    setProgress(0);
                    currentIndex = 0;
                    processTask();
                }, 2000);
                return;
            }

            const task = taskList[currentIndex];
            setActiveTask(task.id);
            setProgress(0);

            const duration = task.duration;
            const steps = 100;
            const stepDuration = duration / steps;

            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setCompletedTasks((prev) => [...prev, task.id]);
                        setActiveTask(null);
                        setTimeout(() => {
                            currentIndex++;
                            processTask();
                        }, 500);
                        return 100;
                    }
                    return prev + 1;
                });
            }, stepDuration);
        };

        processTask();

        return () => {
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [taskList]);

    return (
        <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 rounded-2xl p-6 shadow-lg flex flex-col overflow-hidden border border-indigo-100 dark:border-indigo-900/50">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {projectTitle}
                    </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Development Pipeline
                </p>
            </div>

            {/* Task List */}
            <div className="flex-grow space-y-3 overflow-y-auto">
                {taskList.map((task) => {
                    const isCompleted = completedTasks.includes(task.id);
                    const isActive = activeTask === task.id;

                    return (
                        <div
                            key={task.id}
                            className={`p-4 rounded-xl transition-all duration-500 ${isCompleted
                                ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600'
                                : isActive
                                    ? 'bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-600 scale-105'
                                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 animate-scaleIn" />
                                ) : isActive ? (
                                    <div className="w-6 h-6 rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                                )}
                                <div className="flex-1">
                                    <p
                                        className={`font-semibold text-sm ${isCompleted
                                            ? 'text-green-700 dark:text-green-300 line-through'
                                            : isActive
                                                ? 'text-indigo-700 dark:text-indigo-300'
                                                : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {task.title}
                                    </p>
                                    {isActive && (
                                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-100 rounded-full"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                        Completed: {completedTasks.length}/{taskList.length}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        {Math.round((completedTasks.length / taskList.length) * 100)}%
                    </span>
                </div>
            </div>

            <style jsx>{`
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
