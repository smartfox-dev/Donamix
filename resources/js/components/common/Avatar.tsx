import * as React from 'react';

import {
  AvatarFallback,
  AvatarImage,
  Avatar as RawAvatar,
} from '@/components/ui/avatar';

import { User } from '@/lib/validation/user';

interface IAvatarProps {
  src?: string;
  user?: User | null;
  className?: string;
  onClick
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({
  src,
  user,
  className,
  onClick
}) => {
  return (
    <RawAvatar className={className} onClick={onClick}>
      <AvatarImage src={src ? src : ((user && user.avatar) ? user.avatar : '')} />
      <AvatarFallback >
        {user && user.firstName
          ? user.firstName
            .split(' ')
            .map((subName) => subName.slice(0, 1))
            .join('')
          : 'DM'}
      </AvatarFallback>
    </RawAvatar>
  );
};

export default Avatar;
