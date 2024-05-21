import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Select, { Theme } from 'react-select'
import { User, userValidator } from '@/lib/validation/user';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@material-tailwind/react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { updateUser } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';

const BasicInformation = () => {
  const { user, reload } = useAuthContext();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    status: 'Single',
    city: '',
    country: '',
    description: '',
    birthday : '',
  });
  

  useEffect(() => {
    if (user) {
      setInput({
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        city: user.city,
        country: user.country,
        description: user.description,
        birthday : user.birthday,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRadioSelect = (name: string, value: string) => {
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    setIsSaving(true);
    const newUser: User = userValidator.parse({
      ...user,
      firstName: input.firstName,
      lastName: input.lastName,
      birthday: input.birthday,
      status: input.status,
      city: input.city,
      country: input.country,
      description: input.description,
    });

    updateUser(user.id, newUser)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          reload();
          console.log(res);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-black font-poppins">
        Edit Basic Information
      </h3>
      <p className="text-[#7D7D7D] font-medium font-poppins mt-[14px]">
        Control your profile information, both what it says and what other
        people see. User profiles are shown across all Donamix website. Complete
        your profile 100% to reach more people.
      </p>

      <div className="flex flex-col gap-5 mt-5">
        <div className="grid grid-cols-12 w-full gap-3">
          <Input
            name="firstName"
            value={input.firstName}
            onChange={onInputChange}
            placeholder="First Name"
            className="rounded-[9px] col-span-12 md:col-span-6"
          />
          <Input
            name="lastName"
            value={input.lastName}
            onChange={onInputChange}
            placeholder="Last Name"
            className="flex-1 rounded-[9px] col-span-12 md:col-span-6"
          />
        </div>
        <div>
          <h6 className="text-base font-semibold text-black font-poppins">
            Date of Birth
          </h6>
          <div className="grid grid-cols-12 gap-3 mt-3">
            <Input
              name="birthday"
              type="date"
              value={input.birthday}
              onChange={onInputChange}
              placeholder="Day"
              className="flex-1 rounded-[9px] col-span-12 md:col-span-4"
            />
            {/* <Input
              name="month"
              value={input.month}
              onChange={onInputChange}
              placeholder="Month"
              className="flex-1 rounded-[9px] col-span-12 md:col-span-4"
            />
            <Input
              name="year"
              value={input.year}
              onChange={onInputChange}
              placeholder="Year"
              className="flex-1 rounded-[9px] col-span-12 md:col-span-4"
            /> */}
          </div>
        </div>

        <div>
          <h6 className="text-base font-semibold text-black font-poppins">
            Status
          </h6>
          <RadioGroup
            defaultValue="Male"
            value={input.status}
            name="gender"
            onValueChange={(value: string) => {
              onRadioSelect('status', value);
            }}
            className="grid grid-cols-12 gap-3 mt-3 text-[#808080]"
          >
            <div className="flex items-center flex-1 gap-3 h-[42px] bg-secondary border border-[#E7E7E7] px-3 rounded-lg col-span-12 md:col-span-6">
              <RadioGroupItem value="Single" id="option-single" />
              <Label htmlFor="option-single" className="font-normal">
                Single
              </Label>
            </div>
            <div className="flex items-center flex-1 gap-3 h-[42px] bg-secondary border border-[#E7E7E7] px-3 rounded-lg col-span-12 md:col-span-6">
              <RadioGroupItem value="Married" id="option-married" />
              <Label htmlFor="option-married" className="font-normal">
                Married
              </Label>
            </div>
            <div className="flex-1"></div>
          </RadioGroup>
        </div>

        <div>
          <h6 className="text-base font-semibold text-black font-poppins">
            Location
          </h6>
          <div className="grid grid-cols-12 gap-3 mt-3">
            <CountryDropdown
              value={input.country}
              name="country"
              onChange={(val) => {
                setInput((prev) => ({
                  ...prev,
                  country: val,
                }));
              }}
              classes="mt-4 p-2 h-[42px] bg-secondary placeholder:text-sm rounded-lg border border-[#E7E7E7] w-full col-span-12 md:col-span-6"
            />
            <RegionDropdown
              country={input.country}
              value={input.city}
              name="city"
              onChange={(val) => {
                setInput((prev) => ({
                  ...prev,
                  city: val,
                }));
              }}
              classes="p-2 h-[42px] mt-4 bg-secondary placeholder:text-sm rounded-lg border border-[#E7E7E7] w-full col-span-12 md:col-span-6"
            />
          </div>
        </div>

        <div>
          <h6 className="text-base font-semibold text-black font-poppins">
            About
          </h6>
          <div className="flex justify-between gap-3 mt-3">
            <Textarea
              placeholder="Enter Description"
              name="description"
              value={input.description}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div>
          <Button
            className="w-full"
            onClick={onSubmit}
            disabled={isSaving}
          >
            Save Changes
          </Button>
        </div>
        <section className="w-full p-4 mt-6 bg-white rounded-lg">
          <h5 className="text-base font-bold">
            Received Gifts <b className='font-poppins'>23</b>
          </h5>
          <div className='grid grid-cols-12 gap-4 mt-4'>
            <div className='col-span-6 md:col-span-3'>
              <div className='flex flex-col items-center gap-1'>
                <img src='/images/gifts/1.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                <h6 className='text-base font-semibold'>
                  Child
                </h6>
                <div className='flex gap-1'>
                  <img src='/images/money.svg' width={16} height={16} />
                  <p className='text-xs text-[#545454'>12</p>
                </div>
              </div>
            </div>

            <div className='col-span-6 md:col-span-3'>
              <div className='flex flex-col items-center gap-1'>
                <img src='/images/gifts/2.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                <h6 className='text-base font-semibold'>
                  Crown
                </h6>
                <div className='flex gap-1'>
                  <img src='/images/money.svg' width={16} height={16} />
                  <p className='text-xs text-[#545454'>124</p>
                </div>
              </div>
            </div>

            <div className='col-span-6 md:col-span-3'>
              <div className='flex flex-col items-center gap-1'>
                <img src='/images/gifts/3.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                <h6 className='text-base font-semibold'>
                  Cake
                </h6>
                <div className='flex gap-1'>
                  <img src='/images/money.svg' width={16} height={16} />
                  <p className='text-xs text-[#545454'>102</p>
                </div>
              </div>
            </div>

            <div className='col-span-6 md:col-span-3'>
              <div className='flex flex-col items-center gap-1'>
                <img src='/images/gifts/4.png' className='w-[60px] h-[60px] bg-contain bg-no-repeat' />
                <h6 className='text-base font-semibold'>
                  Orange
                </h6>
                <div className='flex gap-1'>
                  <img src='/images/money.svg' width={16} height={16} />
                  <p className='text-xs text-[#545454'>16</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BasicInformation;
