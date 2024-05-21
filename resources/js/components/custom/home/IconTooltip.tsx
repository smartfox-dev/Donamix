import React, { useState } from 'react';

export const IconTooltip = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute top-[-60px] left-[-10px] bg-gray-800 text-white p-2 rounded-md">
          {content}
        </div>
      )}
    </div>
  );
};