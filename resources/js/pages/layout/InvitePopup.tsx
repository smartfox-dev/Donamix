import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react';
import { Button } from '@/components/ui/button';

interface IInvitePopupProps {
  children: React.ReactNode;
}

const InvitePopup: React.FC<IInvitePopupProps> = ({children}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <Popover placement='bottom-end'>
      <PopoverHandler>
        <div>{children}</div>
      </PopoverHandler>
      <PopoverContent className='rounded-xl flex flex-col max-w-[334px] h-auto drop-shadow-lg z-[9001] p-7 gap-3'>
        <img src='/images/notification/invite.png' className='w-full h-auto' alt='' onLoad={() => setIsImageLoaded(true)} />
        {isImageLoaded && (
          <>
            <p className='font-poppins font-bold text-xl text-black'>Unleash the referral revolution at Donamix! Invite friends to join our vibrant community and unlock incredible rewards. Experience the best features together.</p>
            <input type='text' placeholder='Type Email or Contact to invite' className='p-2 rounded-sm w-full h-auto' />
            <div className='flex flex-row items-center justify-between'>
              <Button className='max-w-[133px]'>INVITE</Button>
              <div className="flex flex-row items-center gap-2">
                <img src='/images/facebook.svg' className='w-[24px] h-[24px]' alt=''/>
                <img src='/images/linkedin.png' className='w-[24px] h-[24px]' alt=''/>
                <img src='/images/telegram.svg' className='w-[24px] h-[24px]' alt=''/>
                <img src='/images/whatsapp.svg' className='w-[24px] h-[24px]' alt=''/>
                <img src='/images/x.png' className='w-[18px] h-[18px]' alt=''/>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default InvitePopup
