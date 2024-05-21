import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Card, CardContent, } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export type BirthdayMember = {
    avatar: string;
    firstName: string;
    lastName: string;
    role: string;
    birthday: Date;
};

interface IBirthdayMemberItemProps {
    item: BirthdayMember;
    bgColor?: string;
}

const BirthdayMemberItem: React.FunctionComponent<IBirthdayMemberItemProps> = ({
    item, bgColor
}) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/profile/userprofile');
    }

    return (
        <Card className={`mt-2 lg:mt-5 rounded-b-none w-[195px] h-[222px] min-w-[195px] min-h-[222px] ${bgColor}`} onClick={handleOnClick}>
            <CardContent className='pb-5 pt-3 px-3'>
                <div className="flex flex-row w-full justify-end font-inter font-semibold text-sm">{item.birthday}</div>
                <div className="flex flex-col gap-4 items-center">
                    <Avatar className='w-[88px] h-[88px]'>
                        <AvatarImage src={item.avatar} alt="" />
                        <AvatarFallback>
                            {item && item.firstName
                                .split(' ')
                                .map((subName) => subName.slice(0, 1))
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h5 className="font-bold text-black font-poppins text-lg">
                            {item.firstName} {item.lastName}
                        </h5>
                        <p className={cn('font-poppins text-lg font-medium text-center', item.role === 'VIP' && 'text-[#8874DC]' , item.role === 'Moderator' && 'text-[#4C7737]' , item.role === 'Admin' && 'text-[red]' , item.role === 'Member' && 'text-[#AAA]')}>{item.role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BirthdayMemberItem;
