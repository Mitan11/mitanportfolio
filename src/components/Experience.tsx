import React from 'react'
import { Timeline } from './ui/timeline';
import { workExperiance } from '@/data';

function Experience() {

    return (
        <div className='py-10 ' id='projects'>
            <h1 className="heading ">
                My{" "}
                <span className="text-purple">work experience</span>
            </h1>
            <div className="flex flex-col items-center max-lg:mt-6">
                <div className="relative w-full mx-auto overflow-clip">
                    <Timeline data={workExperiance} />
                </div>
            </div>
        </div>
    )
}

export default Experience