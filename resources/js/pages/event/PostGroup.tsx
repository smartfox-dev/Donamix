import React from 'react';
// import 'react-multi-carousel/lib/u';
import { useState, useEffect, useMemo } from 'react';
import { Post, postValidator } from '@/lib/validation/post';
import { Comment } from '@/lib/validation/comment';
import CONSTANTS, { Option } from '@/config/constants';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { getPosts } from '@/api/post';
import { Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

import PostCard from '@/components/widgets/post/PostCard';
import { getFeedData, getGroupList } from '@/api/advertise';
import { Advertise } from '@/lib/validation/advertise';

import { GroupComment, groupcommentValidator } from '@/lib/validation/groupcomment';
import { createGroupOrUpdateComment } from '@/api/post/comment';

const LIMIT = 10;

export default function PostGroup() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/profile/' + user.username);
    }
    const [sidbarExpanded, setSidebarExpanded] = useState(null);
    const [groupList, setGroupList] = useState([]);
    const { user } = useAuthContext();
    const [input, setInput] = useState<{
        description: string;

    }>({
        description: '',
    });

    const [commentInput, setCommentInput] = useState<{
        description: string;
        is_edit: number;
        id: number;

    }>({
        description: '',
        is_edit: 0,
        id: 0,
    });

    const [birthdayMembers, setBirthdayMembers] = useState<BirthdayMember[]>([]);
    const [isPerspective, setisPerspective] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(-1);
    const [realCount, setRealCount] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const availableLimit = useMemo(() => {
        if (realCount && realCount - from < LIMIT) return realCount - from;
        return LIMIT;
    }, [from, realCount]);


    const load = () => {
        getPosts()
            .then((res) => {
                if (res.code === CONSTANTS.SUCCESS) {
                    if (res.data) {
                        const temp = res.data;
                        if (from === 0) setPosts(temp);
                        else setPosts((prev) => [...prev, ...temp]);
                        setFrom(from + temp.length);

                    }
                    if (res.totalCount) {
                        if (totalCount < 0) setTotalCount(res.totalCount);
                        setRealCount(res.totalCount);
                    }
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.warn('Error while loading blogs', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        load();
    }, []);

    const removePost = (post: Post) => {
        let filteredArray = posts.filter(item => item !== post)
        setPosts(filteredArray);
    }

    const updatePost = (post: Post) => {
        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    return post;
                } else {
                    return item;
                }
            })
        )
    }


    const updateEmoticon = (arg: String, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    switch (arg) {
                        case 'like':
                            item.like = item.like + 1
                            item.is_like = 1
                            break;

                        case 'unlike':
                            item.like = item.like - 1
                            item.is_like = 0
                            break;

                        case 'heart':
                            item.heart = item.heart + 1
                            item.is_heart = 1
                            break;

                        case 'unheart':
                            item.heart = item.heart - 1
                            item.is_heart = 0
                            break;

                        case 'clap':
                            item.clap = item.clap + 1
                            item.is_clap = 1
                            break;

                        case 'unclap':
                            item.clap = item.clap - 1
                            item.is_clap = 0
                            break;

                        case 'laugh':
                            item.laugh = item.laugh + 1
                            item.is_laugh = 1
                            break;

                        case 'unlaugh':
                            item.laugh = item.laugh - 1
                            item.is_laugh = 0
                            break;

                        default:
                            break;
                    }
                    return item;
                } else {
                    return item;
                }
            }));

    }

    const addComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {
                    item.comments.push(comment);
                    return item;
                } else {
                    return item;
                }
            }));

    }


    const destroyComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];

                        if (element.id == comment.id) {
                            item.comments.splice(index, 1);
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }

    const removePhoto = (photo: any, post: Post) => {

        setPosts(
            posts.map((item) => {

                if (item.id == post.id) {

                    item.medias = item.medias.filter((media) => media.url != photo.url)

                    return item;
                } else {
                    return item;
                }
            }));

    }


    const updateComment = (comment: Comment, post: Post) => {

        setPosts(
            posts.map((item) => {
                if (item.id === post.id) {

                    for (let index = 0; index < item.comments.length; index++) {
                        const element = item.comments[index];
                        if (element.id == comment.id) {
                            item.comments[index].description = comment.description
                            item.comments[index].is_edited = comment.is_edited
                        }
                    }

                    return item;
                } else {
                    return item;
                }
            }));

    }

    const saveComment = async (description) => {
        console.log("****************groupList:", groupList)
        const saveCommentPromises = groupList.map(groupItem => {

            const newComment: GroupComment = groupcommentValidator.parse({
                id: 0,
                description: description,
                is_edit: 0,
                user_id: user?.id,
                group_id: groupItem?.id,
            });

            createGroupOrUpdateComment(newComment)
                .then((res) => {
                    if (res.code === CONSTANTS.SUCCESS) {
                    } else toast.error(res.message);
                })
                .catch((err) => {
                    console.log('Error while creating a blog:', err);
                })

        })
    }

    if (isLoading) {
        return (
            <div className="items-center justify-center flex w-full h-[300px]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {posts.map((post: Post, i: number) => (
                <>
                    <PostCard
                        key={`post-${i}`}
                        item={post}
                        currentUser={user}
                        removePost={removePost}
                        updatePost={updatePost}
                        addComment={addComment}
                        updateComment={updateComment}
                        destroyComment={destroyComment}
                        updateEmoticon={updateEmoticon}
                        removePhoto={removePhoto}
                        profile={true}
                    />
                </>

            )
            )}
        </div>
    )
}
