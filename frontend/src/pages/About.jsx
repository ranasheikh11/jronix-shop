import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={t('aboutUs').split(' ')[0]} text2={t('aboutUs').split(' ')[1] || ''} />
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Photo" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>{t('aboutInfo')}</p>
          <p>{t('aboutInfo2')}</p>
          <b className='text-gray-800'>{t('mission')}</b>
          <p>{t('missionText')}</p>
          <b className='text-gray-800'>{t('vision')}</b>
          <p>{t('visionText')}</p>
        </div>
      </div>
      <div className='py-4 text-xl'>
        <Title text1={t('whyChooseUs').split(' ')[0]} text2={t('whyChooseUs').slice(t('whyChooseUs').indexOf(' ') + 1)} />
      </div>
      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>{t('qualityAssurance')}</b>
          <p className='text-gray-600'>At Jeronix Shop, quality comes first. Every product is carefully chosen and inspected to meet our high standards. Shop with confidence, knowing we ensure excellence in every detail.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>{t('convenience')}</b>
          <p className='text-gray-600'>Jeronix Shop ensures a smooth shopping experience with easy browsing, fast shipping, simple returns, and multiple payment options. Your comfort and satisfaction are our priorities.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>{t('customerService')}</b>
          <p className='text-gray-600'>At Jeronix Shop, exceptional service is our promise. Our dedicated support team is here to assist you with any questions or concerns, ensuring a smooth and satisfying shopping experience.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
