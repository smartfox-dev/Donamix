import React, { useState } from 'react';

const LogoUpload = ({ logo, setLogo }) => {

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center w-full">
            <label
                className={`w-24 h-24 rounded-full flex justify-center items-center cursor-pointer ${logo ? '' : 'bg-gray-300'}`}
                style={{
                    background: logo ? `url('${logo}') center center/cover` : '',
                }}
            >
                <input
                    id="logo-upload"
                    name="logo-upload"
                    type="file"
                    className="hidden"
                    onChange={handleLogoChange}
                    accept="image/png, image/jpeg, image/gif"
                />
                {!logo && (
                    <img src='images/job/upload_icon.png' />
                )}
            </label>
            <p className='font-bold'>Add Company Logo</p>
        </div>
    );
};

export default LogoUpload;