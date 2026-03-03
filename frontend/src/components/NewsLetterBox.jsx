import { useTranslation } from 'react-i18next';

const NewsLetterBox = () => {
    const { t } = useTranslation();

    const onSubmitHandler = (event) => {
        event.preventDefault();

    }

    return (
        <div className='flex flex-col items-center gap-3 py-10 px-[4%] my-10 bg-pink-50 rounded-2xl border border-pink-100 shadow-sm'>
            <p className='text-3xl font-bold text-gray-800'>{t('newsLetterTitle')}</p>
            <p className='mt-3 text-gray-500'>
                {t('newsLetterDesc')}
            </p>
            <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 mx-auto mt-6 border border-pink-200 pl-4 rounded-full overflow-hidden bg-white sm:w-1/2'>
                <input className='w-full outline-none sm:flex-1' type="email" placeholder={t('newsLetterPlaceholder')} required />
                <button type='submit' className='premium-btn border-none'>{t('newsLetterButton')}</button>
            </form>
        </div>
    )
}

export default NewsLetterBox
