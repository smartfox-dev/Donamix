import { useEffect, useRef } from 'react';

import CONSTANTS from '@/config/constants';

const FileUpload = ({ children, onSuccess, ...props }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // cloudinaryRef.current = new Cloudinary({cloud: import.meta.env.VITE_CLOUDINARY_NAME, api: import.meta.env.VITE_CLOUDINARY_API_KEY, url: import.meta.env.VITE_CLOUDINARY_URL});
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: 'iablofcf',
        sources: ['local', 'url', 'width', 'height', 'duration'],
      },
      (err, res) => {
        if (!err && res.event === CONSTANTS.SUCCESS) {
          onSuccess(res.info);
        }
      }
    );
  }, []);

  return (
    <div
      onClick={() => {
        widgetRef.current?.open();
      }}
      className={props.className ? props.className : ''}
    >
      {children}
    </div>
  );
};

export default FileUpload;
