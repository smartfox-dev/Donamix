import React from 'react';
import Select, { MultiValue } from 'react-select';
import { User, userValidator } from '@/lib/validation/user';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import ChipDismissible from '@/components/common/ChipDismissible';
import { Spinner } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';
import { type Option, InterestOptions as options } from '@/config/constants';

const Interests = () => {
  const { user, reload } = useAuthContext();
  // const [options, setOptions] = useState<Option[]>(InterestOptions);
  const [interests, setInterests] = useState<MultiValue<Option>>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.interests) {
      setInterests(
        options.filter((val) =>
          user.interests ? user.interests.includes(val.value) : false
        )
      );
    }
  }, [user]);

  useEffect(() => {
    
  }, [])  

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  const onChange = (value: MultiValue<Option>) => {
    console.log(value);
    setInterests(value);
  };

  const onSubmit = () => {
    setIsSaving(true);
    const newUser: User = userValidator.parse({
      ...user,
      interests: interests.map((val) => val.value),
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
    <div className="min-h-[700px] flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-black font-poppins">
          Interests
        </h3>

        <Select
          className="mt-5"
          isMulti
          value={interests}
          components={{
            MultiValueContainer: () => <div className="hidden"></div>,
          }}
          onChange={onChange}
          options={options}
        />

        <div className="h-[400px] mt-5">
          <div className="flex flex-row flex-wrap gap-3">
            {options.map((val: Option, i: number) => (
              <ChipDismissible
                key={`interest-option-${i}`}
                open={
                  !!interests.find((interest) => interest.value === val.value)
                }
                value={val.label}
                onClose={() => {
                  setInterests(
                    interests.filter((interest) => interest.value != val.value)
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        className="w-full p-6 font-poppins font-semibold text-lg"
        onClick={onSubmit}
        disabled={isSaving}
      >
        Add
      </Button>
    </div>
  );
};

export default Interests;
