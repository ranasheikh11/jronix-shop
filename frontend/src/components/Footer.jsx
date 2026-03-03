import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <Link to='/'>
                        <span className='inline-block mb-3 text-xl font-bold tracking-widest text-pink-dark'>JERONIX SHOP</span>
                    </Link>
                    <p className='w-full text-gray-600 md:w-2/3'>{t('footerText')}</p>
                </div>

                <div>
                    <p className='mb-5 text-xl font-medium'>{t('company')}</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <Link to='/' className='hover:text-pink-dark transition-colors'><li>{t('navHome')}</li></Link>
                        <Link to='/collection' className='hover:text-pink-dark transition-colors'><li>{t('navCollection')}</li></Link>
                        <Link to='/about' className='hover:text-pink-dark transition-colors'><li>{t('navAbout')}</li></Link>
                        <Link to='/contact' className='hover:text-pink-dark transition-colors'><li>{t('navContact')}</li></Link>
                    </ul>
                </div>

                <div>
                    <p className='mb-5 text-xl font-medium'>{t('getInTouch')}</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className='hover:text-pink-dark transition-colors'>01613475871</li>
                        <li className='hover:text-pink-dark transition-colors'>rofikul6424islam@gmail.com</li>
                        <li className='mt-4 font-semibold text-pink-dark'>Design by Jasmin (Developer)</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className='border-pink-100' />
                <p className='py-5 text-sm text-center text-gray-500'>{t('copyright')}</p>
            </div>
        </div>
    )
}

export default Footer
