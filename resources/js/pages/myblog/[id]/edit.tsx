import React from 'react';
import { Blog, blogValidator } from '@/lib/validation/blog';
import CONSTANTS, { Option } from '@/config/constants';
import { Card, CardBody, Input, Spinner } from '@material-tailwind/react';
import Select, { Theme } from 'react-select';
import { getBlogByName, getBlogCategories, updateBlog } from '@/api/blog';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import FileUpload from '@/components/common/FileUpload';
import RichTextEditor from '@/components/common/RichTextEditor';
import SunEditor from 'suneditor/src/lib/core';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

const MyBlogEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bodyRef = useRef<SunEditor | null>();
  const { user } = useAuthContext();
  const [input, setInput] = useState<{
    title: string;
    category_id: Option | string;
    description: string;
    banner: string;
  }>({
    title: '',
    category_id: '',
    description: '',
    banner: '',
  });
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState<Blog | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [categories, setCategories] = useState<readonly Option[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBlogCategories()
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          console.log(res.data);
          setCategories(
            res.data!.map((val) => ({ value: val._id, label: val.name }))
          );
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (params && params.id) {
      getBlogByName(params.id)
        .then((res) => {
          if (res.code === CONSTANTS.SUCCESS) {
            setItem(res.data!);
          } else {
            console.log('Failed:', res.message);
          }
        })
        .catch((err) => {
          console.log('Failed to get blog:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params]);

  useEffect(() => {
    if (item) {
      let category_id: Option | string | undefined = '';
      if (categories) {
        category_id = categories.find((val) => val.value === item.category_id);
      }
      setInput((prev) => ({
        ...prev,
        title: item.title,
        category_id: category_id ? category_id : '',
        description: item.description,
        banner: item.banner,
      }));
      bodyRef.current?.setContents(item.description);
    }
  }, [item, categories]);

  if (isLoading)
    return (
      <div className="flex h-[300px] items-center justify-center w-full">
        <Spinner />
      </div>
    );

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBannerChange = ({ url }: { url: string }) => {
    setInput((prev) => ({
      ...prev,
      banner: url,
    }));
  };

  const onSubmit = () => {
    if (!user) return;

    setIsSaving(true);
    const newBlog: Blog = blogValidator.parse({
      ...input,
      category_id: typeof input.category_id === 'string' ? input.category_id : input.category_id.value,
      user_id: user.id,
    });
    updateBlog(item.id as string, newBlog)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          navigate('/myblog');
          toast.success(res.message);
        } else toast.error(res.message);
      })
      .catch((err) => {
        setErrors(err.errors);
        console.log('Error while creating a blog:', err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="w-full px-2 py-6 lg:p-6">
      <h1 className="text-black font-poppins text-[28px] font-bold">
        Edit Blog
      </h1>

      <Card className="mt-2 lg:mt-5">
        <CardBody className="p-3 lg:p-6">
          <h4 className="text-xl text-black font-inter">Edit Blog</h4>
          <div
            className="bg-primary h-[300px] w-full mt-2 lg:mt-4 rounded-t-3xl flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: input.banner ? `url(${input.banner})` : '',
            }}
          >
            <FileUpload onSuccess={onBannerChange}>
              <Button className="text-sm">
                Edit Photo
              </Button>
            </FileUpload>
          </div>
          <div className="mt-5 lg:mt-8">
            <h6 className="text-base font-bold text-black">Title of Blog</h6>
            <Input
              name="title"
              value={input.title}
              onChange={onInputChange}
              placeholder="Enter Title of Discussion"
              className="!border-t-gray-400 focus:!border-t-gray-900 mt-2 !placeholder:text-sm"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin={undefined}
            />
            {errors.title && 
            (<div className="text-base text-red-600 mt-4">This filed is required!</div>
            )}
          </div>
          <div className="mt-8">
            <h6 className="text-base font-bold text-black">Blog category</h6>
            <Select
              menuIsOpen={isCategoryMenuOpen}
              onMenuOpen={() => setIsCategoryMenuOpen(true)}
              onMenuClose={() => setIsCategoryMenuOpen(false)}
              value={input.category_id}
              options={categories}
              onChange={(newVal) => {
                const newOption = newVal as Option;
                setInput((prev) => ({
                  ...prev,
                  category_id: newOption,
                }));
              }}
              theme={(theme: Theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: 'black',
                },
              })}
              classNamePrefix="blog-category"
              styles={{
                control: (base) => ({
                  ...base,
                  height: 50,
                  borderRadius: 6,
                  zIndex: 5,
                  'input:focus-visible': {
                    boxShadow: 'none',
                    outline: 'none',
                    border: 'none',
                  },
                }),
              }}
              className={cn(
                'text-[13px] font-poppins mt-2',
                isCategoryMenuOpen ? 'z-10' : 'z-5'
              )}
              placeholder="Enter category here"
            />
            {errors.category_id && 
            (<div className="text-base text-red-600 mt-4">This filed is required!</div>
            )}
            {/* <Input
              name="category_id"
              value={input.category_id}
              onChange={onInputChange}
              placeholder="Enter category_id here"
              className="!border-t-gray-400 focus:!border-t-gray-900 mt-2 !h-[50px]"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              containerProps={{
                className: 'min-w-0',
              }}
              crossOrigin={undefined}
            /> */}
          </div>
          <div className="mt-8">
            <RichTextEditor
              getSunEditorInstance={(editor: SunEditor) => {
                bodyRef.current = editor;
              }}
              setDefaultStyle="font-family: Poppins; font-size: 12px; z-index: 5;"
              defaultValue={input.description}
              placeholder="Type your discussion here"
              onChange={(content) => {
                console.log(content);
                setInput((prev) => ({
                  ...prev,
                  description: content,
                }));
              }}
            />
            {errors.description && 
            (<div className="text-base text-red-600 mt-4">This filed is required!</div>
            )}
          </div>
          <div className="mt-5">
            <Button
              className="w-full h-[50px]"
              onClick={onSubmit}
              disabled={isSaving}
            >
              Save Article
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyBlogEdit;
