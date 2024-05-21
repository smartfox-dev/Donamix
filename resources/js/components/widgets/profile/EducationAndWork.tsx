import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { User, userValidator } from '@/lib/validation/user';
import { cn, formatDate } from '@/lib/utils';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import DatePicker from 'react-datepicker';
import { Input } from '@/components/ui/input';
import { Spinner } from '@material-tailwind/react';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { updateUser } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';

const EducationAndWork = () => {
  const { user, reload } = useAuthContext();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [education, setEducation] = useState({
    university: '',
    from: new Date(),
    to: new Date(),
    description: '',
  });
  const [experience, setExperience] = useState({
    company: '',
    position: '',
    from: new Date(),
    to: new Date(),
    location: '',
    description: '',
  });
  const [tab, setTab] = useState<string>('education');

  useEffect(() => {
    if (user) {
      if (user.education) {
        setEducation({
          university: user.education.university || '',
          from: user.education.from
            ? new Date(user.education.from)
            : new Date(),
          to: user.education.to ? new Date(user.education.to) : new Date(),
          description: user.education.description,
        });
      }
      if (user.experience) {
        setExperience({
          company: user.experience.company || '',
          position: user.experience.position,
          from: user.experience.from
            ? new Date(user.experience.from)
            : new Date(),
          to: user.experience.to ? new Date(user.experience.to) : new Date(),
          location: user.experience.location,
          description: user.experience.description,
        });
      }
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  const onEducationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onExperienceChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    setIsSaving(true);
    const newUser: User = userValidator.parse({
      ...user,
      education: {
        university: education.university,
        from: formatDate(education.from, 'YYYY-MM-DD'),
        to: formatDate(education.to, 'YYYY-MM-DD'),
        description: education.description,
      },
      experience: {
        company: experience.company,
        position: experience.position,
        from: formatDate(experience.from, 'YYYY-MM-DD'),
        to: formatDate(experience.to, 'YYYY-MM-DD'),
        location: experience.location,
        description: experience.description,
      },
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
    <div className="py-10 overflow-visible">
      <Tabs value={tab} className="overflow-visible">
        <TabsHeader
          className="bg-transparent flex align-bottom"
          indicatorProps={{
            className:
              'bg-transparent shadow-none border-b border-b-[3px] border-b-black rounded-none w-[50%] mx-auto',
          }}
        >
          <Tab
            value="education"
            onClick={() => {
              setTab('education');
            }}
          >
            <div
              className={cn(
                'flex items-center py-2 gap-2 font-poppins text-base lg:text-lg font-semibold',
                tab === 'education' ? 'text-black' : 'text-[#6A6A6A]'
              )}
            >
              My education
            </div>
          </Tab>
          <Tab
            value="experience"
            onClick={() => {
              setTab('experience');
            }}
          >
            <div
              className={cn(
                'flex items-center py-2 gap-2 font-poppins text-base lg:text-lg font-semibold',
                tab === 'experience' ? 'text-black' : 'text-[#6A6A6A]'
              )}
            >
              Work Experiences
            </div>
          </Tab>
        </TabsHeader>

        <p className="text-[#7D7D7D] font-medium font-poppins mt-[14px]">
          Control your profile information, both what it says and what other
          people see. User profiles are shown across all Donamix website.
          Complete your profile 100% to reach more people. Note: accounts not
          verified will automatically be deleted by our system.
        </p>

        <TabsBody className="overflow-visible">
          <TabPanel value="education" className="px-0 py-8">
            <div className="grid grid-cols-12 gap-5">
              <Input
                name="university"
                value={education.university}
                onChange={onEducationChange}
                placeholder="University"
                className="flex-1 rounded-[9px] col-span-12"
              />
              <div className="col-span-12 lg:col-span-6">
                <DatePicker
                  selected={education.from}
                  onChange={(date: Date) => {
                    setEducation((prev) => ({
                      ...prev,
                      from: date,
                    }));
                  }}
                  //showIcon
                  placeholderText="From"
                  className="w-full"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DatePicker
                  selected={education.to}
                  onChange={(date: Date) => {
                    setEducation((prev) => ({
                      ...prev,
                      to: date,
                    }));
                  }}
                  //showIcon
                  placeholderText="To"
                  className="w-full"
                />
              </div>

              <div className="col-span-12">
                <h6 className="text-base font-semibold text-black font-poppins">
                  Description
                </h6>
                <div className="flex justify-between gap-3 mt-3">
                  <Textarea
                    placeholder="Enter Description"
                    name="description"
                    value={education.description}
                    onChange={onEducationChange}
                  />
                </div>
              </div>

              <Button
                className="w-full col-span-12"
                onClick={onSubmit}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </TabPanel>

          <TabPanel value="experience" className="px-0 py-8">
            <div className="grid grid-cols-12 gap-5">
              <Input
                name="company"
                value={experience.company}
                onChange={onExperienceChange}
                placeholder="Company"
                className="flex-1 rounded-[9px] col-span-12 lg:col-span-6"
              />

              <Input
                name="position"
                value={experience.position}
                onChange={onExperienceChange}
                placeholder="Position"
                className="flex-1 rounded-[9px] col-span-12 lg:col-span-6"
              />

              <div className="col-span-12 lg:col-span-6">
                <DatePicker
                  selected={experience.from}
                  onChange={(date: Date) => {
                    setExperience((prev) => ({
                      ...prev,
                      from: date,
                    }));
                  }}
                  //showIcon
                  placeholderText="From"
                  className="w-full"
                />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <DatePicker
                  selected={experience.to}
                  onChange={(date: Date) => {
                    setExperience((prev) => ({
                      ...prev,
                      to: date,
                    }));
                  }}
                  //showIcon
                  placeholderText="To"
                  className="w-full"
                />
              </div>

              <Input
                name="location"
                value={experience.location}
                onChange={onExperienceChange}
                placeholder="City/Town"
                className="flex-1 rounded-[9px] col-span-12"
              />

              <div className="col-span-12">
                <h6 className="text-base font-semibold text-black font-poppins">
                  Description
                </h6>
                <div className="flex justify-between gap-3 mt-3">
                  <Textarea
                    placeholder="Enter Description"
                    name="description"
                    value={experience.description}
                    onChange={onExperienceChange}
                  />
                </div>
              </div>

              <Button
                className="w-full col-span-12"
                onClick={onSubmit}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default EducationAndWork;
