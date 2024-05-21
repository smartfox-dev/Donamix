import React, { useState } from 'react';
import SkeletonPlaceholder from './SkeletonPlaceholder';

interface ImageLoaderProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  borderRadius?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, width, height, borderRadius }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && <SkeletonPlaceholder width={width} height={height} borderRadius={borderRadius} />}
      <img
        src={src}
        alt={alt}
        style={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          display: imageLoaded ? 'block' : 'none',
        }}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  );
};

export default ImageLoader;