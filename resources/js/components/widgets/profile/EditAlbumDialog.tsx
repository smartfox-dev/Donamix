import React from 'react';
import { Album, albumValidator } from '@/lib/validation/album';
import { useEffect } from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';

import { Button } from '@/components/ui/button';
import CONSTANTS from '@/config/constants';
import FileUpload from '@/components/common/FileUpload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createAlbum, editAlbum } from '@/api/album';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';

interface IEditAlbumDialogProps {
  open: boolean;
  onClose: () => void;
  album: Album
}

const EditAlbumDialog: React.FC<IEditAlbumDialogProps> = ({
  open,
  onClose,
  album
}) => {
  const { user } = useAuthContext();
  const [input, setInput] = useState<{
    title: string;
    description: string;
    images: Array<{
      title: string;
      description: string;
      url: string;
      createdAt: string;
    }>;
  }>(album);

  useEffect(() => {
    setInput(album);
    console.log("Here's input", input);
  }, [open]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddImage = ({ url }: { url: string }) => {
    setInput((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          title: '',
          description: '',
          url: url,
          createdAt: new Date().toLocaleString(),
        },
      ],
    }));
  };

  const closeClick = (index: number) => {
    setInput((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = () => {
    if (!user) return;

    setIsSaving(true);
    const newAlbum: Album = albumValidator.parse({
      ...input,
      user_id: user.id,
    });

    editAlbum(album.id ? album.id : "", newAlbum)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn('Error while creating Ablum:', err);
      })
      .finally(() => {
        setIsSaving(false);
        onClose();
      });

    setInput({
      title: '',
      description: '',
      images: [],
    })

  };
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Create Album</DialogHeader>
      <DialogBody divider className="flex flex-col gap-4">
        {/* <Input
          placeholder="Title"
          name="title"
          value={input.title}
          onChange={onInputChange}
        />

        <Textarea
          placeholder="Description"
          name="description"
          value={input.description}
          onChange={onInputChange}
        /> */}

        <div className="bg-gray-300 w-full h-[400px] overflow-y-auto rounded-xl outline-dashed outline-gray-400 outline-2 p-4">
          <div className="flex flex-wrap gap-4">
            {input.images.map((image, i) => (
              <div
                key={`album-image-${i}`}
                className="relative rounded-xl w-[120px] h-[120px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image.url})` }}
              ><button className="absolute right-[-8px] top-[-8px] bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none" onClick={() => { closeClick(i) }}>
                  <svg className="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <FileUpload onSuccess={onAddImage}>
              <Button
                variant="outline"
                className="text-2xl border-gray-400 rounded-xl bg-transparent w-[120px] h-[120px]"
              >
                +
              </Button>
            </FileUpload>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="gap-4">
        <Button onClick={onSubmit} className="h-[50px]" disabled={isSaving}>
          Save
        </Button>
        <Button onClick={onClose} className="h-[50px]">
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditAlbumDialog;
