import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={t('contactUs').split(' ')[0]} text2={t('contactUs').split(' ')[1] || ''} />
      </div>
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Photo" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Jeronix Shop 354 Fashion Lane <br />Dhaka, Bangladesh</p>
          <p className='text-gray-500'>{t('tel')}: 01613475871 <br />{t('email')}: rofikul6424islam@gmail.com</p>
          <p className='text-xl font-semibold text-gray-600'>{t('careers')}</p>
          <p className='text-gray-500' dangerouslySetInnerHTML={{ __html: t('careersText') }}></p>
          <button className='px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-gray-800 hover:text-white'>{t('exploreJobs')}</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
