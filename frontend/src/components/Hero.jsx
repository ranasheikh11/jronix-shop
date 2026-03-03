import React from 'react'
import { assets } from '../assets/assets'

import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-col overflow-hidden border border-pink-100 rounded-xl bg-pink-50 sm:flex-row'>
            {/* Hero left side */}
            <div className='flex items-center justify-center w-full py-12 sm:w-1/2 sm:py-0 bg-white bg-opacity-40 backdrop-blur-sm'>
                <div className='text-gray-800'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-pink-dark'></p>
                        <p className='text-sm font-medium tracking-widest uppercase md:text-base text-pink-dark'>{t('heroOurBestSellers')}</p>
                    </div>
                    <h1 className='py-3 text-4xl leading-relaxed lg:text-6xl prata-regular text-gray-900'>{t('heroLatestArrivals')}</h1>
                    <div className='flex items-center gap-2 group cursor-pointer'>
                        <p className='text-sm font-semibold md:text-base group-hover:text-pink-dark transition-colors uppercase tracking-widest'>{t('heroShopNow')}</p>
                        <p className='w-8 md:w-11 h-[1px] bg-gray-800 group-hover:bg-pink-dark group-hover:w-16 transition-all'></p>
                    </div>
                </div>
            </div>
            {/* Hero right side */}
            <div className='w-full sm:w-1/2 overflow-hidden'>
                <img className='w-full h-full object-cover hover:scale-105 transition-all duration-700' src={assets.mainhero} alt="Hero Image" />
            </div>
        </div>
    )
}

export default Hero
