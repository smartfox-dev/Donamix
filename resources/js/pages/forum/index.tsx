import React from 'react'
import { useState, useEffect } from 'react';
// import { SelectedButtonProvider } from './SelectedButtonContext';
// import { useSelectedButtonState } from './SelectedButtonContext';
import { FaPlus } from "react-icons/fa";
import Button from '@/components/common/Button';
import { FaRegCommentDots } from "react-icons/fa";
import ForumHome from './ForumHome';
import ForumIntro from './ForumIntro';
import ForumGuide from './ForumGuide';
import FormEducation from './ForumEducation';
import ForumEducation from './ForumEducation';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export default function Forum() {
  const [isSelectedButton, setIsSelectedButton] = useState(0);
  const selectButton = (buttonIndex) => {
    console.log(buttonIndex, "////////////////////////////////");
    setIsSelectedButton(buttonIndex);
  }

  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    // Append the script to the document head
    document.head.appendChild(script);

    // Initiate the ads script
    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    // Cleanup function to remove the script from the document
    return () => {
      document.head.removeChild(script);
    };
  }, []);


  return (
    <div className="sm:flex-1 flex-col bg-dashboard-background w-full mainBody">
      <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
        <div className="rounded-t-full">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5794587985510139"
            data-ad-slot="3734166205"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        {isSelectedButton == 0 && (
          <ForumHome selectButton={selectButton} />
        )}
        {isSelectedButton == 1 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 2 && (
          <ForumGuide selectButton={selectButton} />
        )}
        {isSelectedButton == 3 && (
          <ForumEducation selectButton={selectButton} />
        )}
        {isSelectedButton == 4 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 5 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 6 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 7 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 8 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 9 && (
          <ForumIntro selectButton={selectButton} />
        )}
        {isSelectedButton == 10 && (
          <ForumIntro selectButton={selectButton} />
        )}

      </div>
    </div>
  )
}
