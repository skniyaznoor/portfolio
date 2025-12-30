'use client';

import React from 'react';
import ProjectChat from '@/components/feature/ProjectChat';
import TaskProgress from '@/components/feature/TaskProgress';
import LiveMetrics from '@/components/feature/LiveMetrics';
import CodeEditor from '@/components/feature/CodeEditor';

interface FeatureReelProps {
    featureType: 'chat' | 'tasks' | 'metrics' | 'code';
    projectTitle: string;
}

const FeatureReel: React.FC<FeatureReelProps> = ({ featureType, projectTitle }) => {
    const renderFeature = () => {
        switch (featureType) {
            case 'chat':
                return <ProjectChat projectTitle={projectTitle} />;
            case 'tasks':
                return <TaskProgress projectTitle={projectTitle} />;
            case 'metrics':
                return <LiveMetrics title={`${projectTitle} Analytics`} />;
            case 'code':
                return <CodeEditor title={projectTitle} />;
            default:
                return <ProjectChat projectTitle={projectTitle} />;
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center snap-start bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
            <div className="w-full h-full max-w-[500px] aspect-[9/16] p-6 flex items-center justify-center">
                <div className="w-full h-full max-h-[680px]">
                    {renderFeature()}
                </div>
            </div>
        </div>
    );
};

export default FeatureReel;
