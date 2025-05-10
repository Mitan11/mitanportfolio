import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'
import { testimonials } from '@/data'
import { cn } from '@/lib/utils'

function Clients() {
    return (
        <div className='py-10' id='testimonials'>
            <div className="text-center mb-8 md:mb-16 px-4 md:px-6">
                <h1 className="heading text-3xl md:text-4xl lg:text-5xl">
                    Kind words from {" "}
                    <span className="text-purple">satisfied clients</span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
                    Don't just take my word for it - hear what others have to say about working with me
                </p>
            </div>
            <div className="flex flex-col items-center mt-6 md:mt-10">
                <InfiniteMovingCards 
                    items={testimonials} 
                    direction='right' 
                    speed='slow'
                    className="py-4 md:py-8"
                />
            </div>
        </div>
    )
}

export default Clients