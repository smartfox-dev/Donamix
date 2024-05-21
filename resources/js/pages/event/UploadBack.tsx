import React, { useState } from 'react';

const PhotoUpload = () => {
    const [coverPhoto, setCoverPhoto] = useState('');

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverPhoto(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-4">
            <label
                className={`w-full h-32 bg-gray-200 rounded-md flex justify-center items-center cursor-pointer ${coverPhoto ? 'bg-cover bg-no-repeat bg-center' : ''
                    }`}
                style={{
                    backgroundImage: coverPhoto ? `url('${coverPhoto}')` : '',
                }}
            >
                {!coverPhoto && (
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <img src='images/group/instagram.png' />
                        <span className="font-semibold text-gray-400">Upload Cover Photo</span>
                    </div>
                )}
                <input
                    id="cover-photo-upload"
                    name="cover-photo-upload"
                    type="file"
                    className="hidden"
                    onChange={handlePhotoChange}
                    accept="image/png, image/jpeg, image/gif"
                />
            </label>
        </div>
    );
};

export default PhotoUpload;