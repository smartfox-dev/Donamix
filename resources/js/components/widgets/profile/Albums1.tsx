import React from 'react';
import { useEffect, useState } from 'react';

import { Album } from '@/lib/validation/album';
import AlbumCard from '@/components/widgets/profile/AlbumCard';
import { Button } from '@/components/ui/button';
import CreateAlbumDialog from '@/components/widgets/profile/CreateAlbumDialog';
import EditAlbumDialog from '@/components/widgets/profile/EditAlbumDialog';
import { Spinner } from '@material-tailwind/react';
import { getMyAlbums, deleteAlbum } from '@/api/album';
import { useAuthContext } from '@/context/AuthContext';
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
const Albums = () => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [albumIndex, setAlbumIndex] = useState<number>(0);
    const { user } = useAuthContext();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [cur, setCur] = useState<number>(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleRemoveAlbum = (i: number) => {
        setAlbumIndex(i);
        setShowConfirmation(true);
    };

    const handleConfirmRemoveAlbum = async (confirm: boolean) => {
        if (confirm) {
            // setAlbumEdit(albumIndex);
            await deleteAlbum(albums[albumIndex].id ? albums[albumIndex].id : "")
            getMyAlbums()
                .then((res) => {
                    setAlbums(res && res.data ? res.data : []);
                })
                .catch((err) => {
                    console.log(err);
                });
            // let newalbums = albums
            // newalbums.splice(albumIndex, 1);
            // setAlbums(newalbums)
        } else {

        }
        setShowConfirmation(false);
    };

    useEffect(() => {
        getMyAlbums()
            .then((res) => {
                if (res && res.data) setAlbums(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner color="blue" />
            </div>
        );
    }

    const onAddAlbum = () => {
        setIsCreateModalOpen(true);
    };

    const onCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        getMyAlbums()
            .then((res) => {
                if (res && res.data) setAlbums(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onEditAlbum = () => {
        setIsEditModalOpen(true);
    };

    const setAlbumEdit = (i: number) => {
        setCur(i)
        setIsEditModalOpen(true);
    };



    const onCloseEditModal = () => {
        setIsEditModalOpen(false);
        getMyAlbums()
            .then((res) => {
                if (res && res.data) setAlbums(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const emptyAlbum: Album = {
        id: null,
        user_id: null,
        title: 'Untitled',
        description: '',
        images: [],
        createdAt: undefined,
        updatedAt: undefined,
        deleted: false
    };

    return (
        <div className='overflow-visible lg:profile-edit-panel-lg profile-edit-panel'>
            {showConfirmation && (
                <div className="z-10 fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-lg font-medium mb-4">Do you really want to remove this album?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleConfirmRemoveAlbum(false)}>No</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleConfirmRemoveAlbum(true)}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
            <CreateAlbumDialog
                open={isCreateModalOpen}
                onClose={onCloseCreateModal}
            />
            <EditAlbumDialog
                open={isEditModalOpen}
                onClose={onCloseEditModal}
                album={albums.length ? albums[cur] : emptyAlbum}
            />
            <h3 className="text-black font-poppins text-xl font-semibold">
                Manage Albums
            </h3>
            <div className="flex flex-col gap-3 mt-5">
                {albums.length > 0 ? (
                    albums.map((val: Album, i: number) => (


                        <div className="w-auto h-auto bg-white rounded-t-3xl p-4 flex flex-col gap-3">
                            <div className="flex flex-row-reverse items-center">
                                <Popover placement="bottom-end">
                                    <PopoverHandler>
                                        <div className="w-8 h-8 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer rounded-md px-[13px] py-[5px]">
                                            <img src="/images/home/Frame3dots.png" className="w-auto h-auto" alt="" />
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <div className="flex flex-col w-[253px] gap-4 pt-3">
                                            <div className="flex flex-row items-center gap-3">
                                                <img src="/images/home/Edit.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black cursor-pointer" onClick={() => setAlbumEdit(i)}>Edit Album</div>
                                            </div>
                                            <div className="flex flex-row items-center gap-3">
                                                <img src="/images/home/dustbin.png" alt="" />
                                                <div className="font-montserrat font-medium text-base text-black cursor-pointer" onClick={() => handleRemoveAlbum(i)}>Delete Album</div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {val.images.length > 0 ? (
                                <div className="flex flex-row gap-3">

                                    {val.images.map((img, i) => (

                                        i == 0 && (
                                            <img src={img.url} className={`${val.images.length !== 1 && 'max-w-[70%]'}`} alt="" />
                                        )

                                    ))}

                                    <div className="flex flex-col gap-3">

                                        {val.images.map((img, i) => (

                                            i != 0 && (
                                                <img src={img.url} alt="" />
                                            )

                                        ))}

                                    </div>
                                </div>

                            ) : (
                                <h4 className="w-full text-center text-gray-800 text-xl">
                                    No Images
                                </h4>
                            )}
                            {/* <div className="flex flex-row gap-3 items-center">
              <Avatar className='w-[28.11px] h-[28.11px]'>
                <AvatarImage src='/images/avatar_1.jpg' alt="" />

              </Avatar>
              <input type='text' placeholder='Add a comment' className="flex-1 border-2 border-gray-300 rounded-sm px-3 py-2"/>

            </div> */}
                        </div>

                        //       <div className="relative">
                        //         <div className="absolute top-2 right-2 flex justify-end w-full">
                        //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-l flex items-center justify-center" onClick={() => setAlbumEdit(i)}>
                        //             <svg fill="#ffffff" className="h-6 w-6 p-1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        //               viewBox="0 0 306.637 306.637" >
                        //               <g>
                        //                 <g>
                        //                   <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
                        // l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
                        //                   <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
                        // L265.13,75.602L231.035,41.507z"/>
                        //                 </g>
                        //               </g>
                        //             </svg>

                        //           </button>
                        //           <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-r flex items-center justify-center" onClick={() => handleRemoveAlbum(i)}>
                        //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        //             </svg>

                        //           </button>
                        //         </div>

                        //         <AlbumCard key={`album-card-${i}`} item={val} />
                        //       </div>
                    ))
                ) : (
                    <h4 className="text-base text-center text-gray-800">No albums</h4>
                )}

                <Button className='font-poppins font-semibold text-lg p-8' onClick={onAddAlbum}>Add Image</Button>
            </div>
        </div>
    );
};

export default Albums;
