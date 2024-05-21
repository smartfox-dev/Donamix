import React from 'react';

interface SkeletonPlaceholderProps {
  width: string;
  height: string;
  borderRadius?: string;
}

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({ width, height, borderRadius = '0px' }) => {
  const style = {
    backgroundColor: '#eee',
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  return <div style={style} />;
};

export default SkeletonPlaceholder;