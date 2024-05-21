import React from 'react';
import { Input, Spinner } from '@material-tailwind/react';
import { createComment, getCommentsByBlog } from '@/api/comment';
import { useEffect, useState } from 'react';

import Avatar from '@/components/common/Avatar';
import { BiSend } from 'react-icons/bi';
import { Blog } from '@/lib/validation/blog';
import { Button } from '@/components/ui/button';
import CONSTANTS from '@/config/constants';
import { Comment } from '@/lib/validation/comment';
import { User } from '@/lib/validation/user';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

interface ICommentBoxProps {
  blog: Blog;
}

const CommentBox: React.FunctionComponent<ICommentBoxProps> = ({ blog }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (blog._id) {
      getCommentsByBlog(blog._id)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            if (res.data) setComments(res.data);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.warn('Error while getting comments by blog:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [blog]);

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = () => {
    if (user && blog && user._id && blog._id) {
      setIsSaving(true);
      const newComment: Comment = {
        blogId: blog._id,
        user_id: user._id,
        comment,
      };

      createComment(newComment)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            toast.success('Sent successfully!');
            if (res.data) {
              setComments(prev => [
                res.data as Comment,
                ...prev
              ])
            }
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.warn('Error while creating comment:', err);
        })
        .finally(() => {
          setComment('');
          setIsSaving(false);
        });
    }
  };

  return (
    <div className="rounded-2xl w-full h-[500px] bg-white flex flex-col">
      <div className="flex-1 p-4 overflow-hidden">
        {isLoading === true ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col-reverse h-full gap-3 overflow-y-auto">
            {comments.length === 0 ? (
              <h5 className="text-center">No Comments</h5>
            ) : (
              comments.map((val: Comment, i: number) => (
                <div key={`comment-${i}`} className="flex gap-2">
                  <Avatar src={val.user?.avatar} user={val.user as User} />
                  <div>
                    <h6 className="font-bold text-primary">{val.user?.username}</h6>
                    <p className="font-medium text-primary">{val.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-4 border-t border-t-gray-200">
        <Input
          name="title"
          value={comment}
          onChange={onCommentChange}
          placeholder="Enter Comment Here"
          className="!border-t-gray-400 focus:!border-t-gray-900 !flex-1 items-center"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          containerProps={{
            className: 'min-w-0 flex items-center',
          }}
          crossOrigin={undefined}
        />
        <Button
          className="gap-2 h-[50px]"
          onClick={onSubmit}
          disabled={isSaving}
        >
          <BiSend />
          Send
        </Button>
      </div>
    </div>
  );
};

export default CommentBox;
