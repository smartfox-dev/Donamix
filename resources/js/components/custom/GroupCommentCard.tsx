import React from 'react'
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GroupComment } from '@/lib/validation/groupcomment';
import { deleteGroupComment } from '@/api/post/comment';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';

export type CommentCard = {
  id: number;
  avatar: string;
  name: string;
  description:string;
  isUser:boolean;
  isSub:boolean;
  is_edited: boolean;
  time_ago: string;
};

interface ICommentCardItemProps {
  item: CommentCard;
  sendItem:(cmt: GroupComment) => void,
  deleteItem:(cmt: GroupComment) => void,
}

const CommentCardItem: React.FunctionComponent<ICommentCardItemProps> = ({
  item,
  sendItem,
  deleteItem,
}) => {


  const [showModal, setShowModal] = useState(false);


  const onEditComment = (item : CommentCard) => {
    sendItem(item)
  }

  return (
    <div className="flex flex-col gap-3 bg-[#F6F6F6] p-4">
      <div className="flex flex-row flex-wrap p-2 justify-between">
        <div className="flex flex-row gap-3">
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
          <div className="font-rubik font-normal text-sm">{item.time_ago}</div>
          {
            item.is_edited == true && (
              <span className='text-sm'>(Edited)</span>
            )
          }
          {item.isUser?<div className="w-[31.62px] h-[16.69px] font-rubik font-medium text-white bg-black text-xs text-center just rounded-sm">you</div>:<></>}
        </div>
        {item.isUser?
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <img src="/images/home/commentdustbin.svg" alt=""/>
              <div className="font-rubik font-medium text-[#ED6368] text-sm" onClick={() => {
                                        setShowModal(true);
                                      }}>Delete</div>
            </div>
            {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                    <div className="relative z-10 p-4 bg-white rounded-lg">
                        <p>Do you really want to delete this comment?</p>
                        <div className="flex justify-end mt-4">
                        <button
                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                            onClick={() => {
                            setShowModal(false);
                            }}
                        >
                            No
                        </button>
                        <button
                            className="px-4 py-2 text-white bg-green-500 rounded-lg"
                            onClick={() => {
                            setShowModal(false);
                            deleteGroupComment(item.id!)
                                .then((res) => {
                                if (res.code === CONSTANTS.SUCCESS) {
                                    deleteItem(item)
                                    toast.success(res.message);
                                } else {
                                    toast.error(res.message);
                                }
                                })
                                .catch((err) => {
                                console.log('Delete Error:', err);
                                });
                            }}
                        >
                            Yes
                        </button>
                        </div>
                    </div>
                    </div>
                )}

            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <img src="/images/home/commentedit.svg" alt=""/>
              <div className="font-rubik font-medium text-black text-sm" onClick={() => onEditComment(item)}>Edit</div>
            </div>
          </div>:          
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <img src="/images/home/Reply.png" alt=""/>
            <div className="font-rubik font-medium text-sm">Reply</div>
          </div>
        }
      </div>
      <div className="font-poppins font-normal text-sm pr-5">{item.description}</div>
    </div>
    
  )
}
export default CommentCardItem;
