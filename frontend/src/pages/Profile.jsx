import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { token, userData, setUserData, backendUrl, fetchUserProfile } = useContext(ShopContext);
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userData) {
            setName(userData.name);
        }
    }, [userData]);

    const handleUpdate = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/user/update-profile', { name }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setIsEditing(false);
                fetchUserProfile();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (!userData) return <div className='py-20 text-center'>Loading profile...</div>;

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='flex flex-col gap-4 mt-10 max-w-lg'>
                <div className='flex items-center gap-4 border-b pb-4'>
                    <p className='text-gray-500 w-24'>Email:</p>
                    <p className='font-medium'>{userData.email}</p>
                </div>

                <div className='flex items-center gap-4 border-b pb-4'>
                    <p className='text-gray-500 w-24'>Name:</p>
                    {isEditing ? (
                        <input
                            type="text"
                            className='border px-2 py-1 rounded w-full outline-pink-dark'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <p className='font-medium'>{userData.name}</p>
                    )}
                </div>

                <div className='mt-6 flex gap-4'>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className='bg-pink-dark text-white px-8 py-2 text-sm rounded hover:bg-pink-900 transition-all'
                            >
                                SAVE CHANGES
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className='border border-gray-300 px-8 py-2 text-sm rounded hover:bg-gray-50'
                            >
                                CANCEL
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='bg-pink-dark text-white px-8 py-2 text-sm rounded hover:bg-pink-900 transition-all'
                        >
                            EDIT PROFILE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
