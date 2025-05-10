'use client'

import React from 'react'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

function Footer() {
    const copyEmail = () => {
        navigator.clipboard.writeText('mitantank00@gmail.com')
        toast.success('Email copied to clipboard!')
    }

    return (
        <footer className='w-full pt-8 md:pt-10 pb-8 md:pb-10 relative overflow-hidden' id='contact'>
            <div className='w-full absolute left-0 -bottom-72 min-h-96 z-0'>
                <img src="/footer-grid.svg" alt="grid" className='w-full h-full opacity-50' />
            </div>
            <div className='flex flex-col items-center relative z-10 px-4 md:px-6 lg:px-8'>
                <h1 className='heading text-2xl md:text-3xl lg:text-4xl lg:max-w-[45vw] text-center'>
                    Ready to take <span className='text-purple'>your</span> digital presence to the next level?
                </h1>
                <p className='text-white-200 md:mt-8 mt-4 text-sm md:text-base lg:text-lg text-center max-w-[90%] md:max-w-[80%] lg:max-w-[60%]'>
                    Reach out to me today and let&apos;s discuss how I can help you achieve your goals
                </p>
                <div className='flex flex-col md:flex-row gap-4 mt-6 md:mt-8'>
                    <a href="mailto:mitantank00@gmail.com?subject=Let's Connect" target="_blank" rel="noopener noreferrer">
                        <MagicButton 
                            title="Send Email" 
                            icon={<FaLocationArrow />} 
                            position='right'
                        />
                    </a>
                    <MagicButton
                        title="Copy Email"
                        icon={<FaLocationArrow />}
                        position='right'
                        handleClick={copyEmail}
                    />
                </div>
            </div>
            <div className='flex mt-12 md:mt-16 justify-center items-center px-4 md:px-6 lg:px-8'>
                <p className='text-sm md:text-base text-center text-white-200'>
                    Copyright © {new Date().getFullYear()} Mitan Tank. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer