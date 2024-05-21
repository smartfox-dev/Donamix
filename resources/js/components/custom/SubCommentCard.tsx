import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type CommentCard = {
  avatar: string;
  name: string;
  uploadedTime: string;
  content: string;
  isUser: boolean;
  isSub: boolean;
  is_edited: boolean;
  time_ago: string;
};

interface ISubCommentCardItemProps {
  item: CommentCard;
}

const SubCommentCardItem: React.FunctionComponent<ISubCommentCardItemProps> = ({
  item,
}) => {
  return (
    <div className="flex flex-col gap-3 ml-10 bg-[#F6F6F6] p-4">
      <div className="flex flex-row flex-wrap p-2 justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar className='w-[28.11px] h-[28.11px]'>
            <AvatarImage src={item.avatar} alt="" />
            <AvatarFallback>
              {item.name
                .split(' ')
                .map((subName) => subName.slice(0, 1))
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="font-rubik font-medium text-sm text-black">{item.name}</div>
          {item.isUser?<div className="w-[31.62px] h-[16.69px] font-rubik font-medium text-white bg-black text-xs text-center just rounded-sm">you</div>:<></>}
          <div className="font-rubik font-normal text-sm">{item.time_ago}</div>{
            item.is_edited && (
              <span>(Edited)</span>
            )
          }
          
        </div>
        <div className="flex flex-row gap-2 items-center">
          {item.isUser?
            <div className="flex flex-row gap-3 items-center">
              <div className="flex flex-row items-center gap-2 cursor-pointer">
                <img src="/images/home/commentdustbin.svg" alt=""/>
                <div className="font-rubik font-medium text-[#ED6368] text-sm">Delete</div>
              </div>
              <div className="flex flex-row items-center gap-2 cursor-pointer">
                <img src="/images/home/commentedit.svg" alt=""/>
                <div className="font-rubik font-medium text-black text-sm">Edit</div>
              </div>
            </div>:          
            <div className="flex flex-row gap-2 items-center cursor-pointer">
              <img src="/images/home/Reply.png" alt=""/>
              <div className="font-rubik font-medium text-sm">Reply</div>
            </div>
          }
        </div>
      </div>
      <div className="font-poppins font-normal text-sm pr-5">
        {/* <span className="text-[#7277E8]">@maxblagun </span> */}
        {item.description}
      </div>
    </div>
  )
}
export default SubCommentCardItem;
