import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export type FriendRequest = {
  avatar: string;
  name: string;
  role: string;
  mutualFriends: number;
  createdAt: string;
};

interface IFriendRequestItemProps {
  item: FriendRequest;
}

const FriendRequestItem: React.FunctionComponent<IFriendRequestItemProps> = ({
  item,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('profile/userprofile');
  }
  return (
    <div>
      <div className="flex items-start gap-4">
        <Avatar className="w-[50px] hover:w-[50px] h-[50px]" onClick={handleOnClick}>
          <AvatarImage src={item.avatar} alt="" />
          <AvatarFallback>
            {item.name
              .split(' ')
              .map((subName) => subName.slice(0, 1))
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h5 className="font-medium text-black font-poppins">
            {item.name}
          </h5>
          <p className="font-poppins text-xs font-medium text-[#999]">{`${item.mutualFriends} mutual Friends`}</p>
          <p
            className={cn(
              'font-poppins text-xs font-medium',
              item.role === 'VIP'
                ? 'text-[#8874DC]'
                : item.role === 'Moderator'
                  ? 'text-[#4C7737]'
                  : 'text-[#AAA]'
            )}
          >
            {item.role}
          </p>
        </div>
        <div>
          <p className="text-[#999] text-xs font-medium">
            {item.createdAt}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <div className="flex-1">
          <Button
            variant="filled"
            className="max-w-[150px] mx-auto flex items-center justify-center text-base"
            fullWidth
          >
            Accept
          </Button>
        </div>
        <div className="flex-1">
          <Button
            variant="filled"
            className="bg-[#F4F4F4] text-[#434343] flex-1 max-w-[150px] mx-auto h-[40px] flex items-center justify-center"
            fullWidth
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestItem;
